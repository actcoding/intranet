<?php

namespace App\Http\Controllers;

use App\Enum\NewsStatus;
use App\Http\Requests\News\NewsListRequest;
use App\Http\Requests\News\NewsStoreRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Http\Requests\News\UploadImageRequest;
use App\Http\Resources\AttachmentResource;
use App\Http\Resources\NewsResource;
use App\Models\Attachment;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show', 'listAttachments']),
        ];
    }

    /**
     * Display a paginated list of News.
     *
     * Guests and normal users will only see published news, while a Creator will receive
     * a list of all news.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<NewsResource>>
     */
    public function index(NewsListRequest $request): AnonymousResourceCollection
    {
        $query = News::query()
            ->orderByDesc('published_at')
            ->with('attachments');

        if (Gate::check('news.viewall')) {
            $query = $query->withTrashed();
        } else {
            $query = $query->whereStatus(NewsStatus::ACTIVE);
        }

        return NewsResource::collection(
            $query->paginate($request->query('perPage', 10))
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(NewsStoreRequest $request): JsonResponse
    {
        Gate::authorize('create', News::class);

        $news = new News($request->validated());
        $news->author_id = auth()->user()->id;

        if ($news->status == NewsStatus::ACTIVE) {
            $news->published_at = now();
        }

        $news->save();
        $news->refresh();

        return response()->json($news, 201);
    }

    /**
     * Display the specified resource.
     *
     * Guests and normal users will only see published news, while a Creator will receive
     * a list of all news.
     *
     * @param  int  $id
     *
     * @unauthenticated
     *
     * @response NewsResource
     */
    public function show($id): NewsResource
    {
        $news = $this->find($id, allowGuest: true);

        $news->load('attachments');
        $news->load('author');

        return new NewsResource($news);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id
     */
    public function update(NewsUpdateRequest $request, $id): Response
    {
        $news = $this->find($id, 'update');

        if ($news->trashed()) {
            abort(403, 'You cannot update trashed news.');
        }

        $news->fill($request->validated());

        if ($news->status == NewsStatus::ACTIVE) {
            if ($news->published_at == null) {
                $news->published_at = now();
            }
        } else {
            $news->published_at = null;
        }

        $news->save();

        return response()->noContent();
    }

    /**
     * Delete the specified resource from storage.
     *
     * @param  int  $id
     */
    public function destroy(Request $request, $id): Response
    {
        $force = $request->boolean('force', false);

        $news = $this->find($id, $force ? 'forceDelete' : 'delete');

        if ($news->trashed()) {
            abort(403, 'You cannot delete trashed news.');
        }

        $force ? $news->forceDeleteQuietly() : $news->delete();

        return response()->noContent();
    }

    /**
     * Restore this resource from a deleted state.
     *
     * @param  int  $id
     */
    public function restore($id): Response
    {
        $news = $this->find($id, 'restore');

        $news->restore();

        return response()->noContent();
    }

    /**
     * Attach a file to the specified resource.
     *
     * @param  int  $id
     */
    public function upload(UploadImageRequest $request, $id): JsonResponse
    {
        $news = $this->find($id, 'update');

        $type = $request->input('type');
        $file = $request->file('file');

        $path = $file->store('news/' . $id . '/' . $type, 'public');

        if ($type == 'attachment') {
            /** @var Attachment */
            $attachment = Attachment::create([
                'name' => $file->getClientOriginalName(),
                'type' => $file->getMimeType(),
                'path' => $path,
            ]);
            $attachment->attach($news);
        } elseif ($type == 'header') {
            $oldImage = $news->getRawOriginal('header_image');
            if ($oldImage != null) {
                Storage::disk('public')->delete($oldImage);
            }

            $news->header_image = $path;
            $news->save();
        }

        return response()->json(['url' => url(Storage::url($path))]);
    }

    /**
     * Delete an attachment from the specified resource.
     *
     * Deletes the specified attachment associated to the given News entity.
     * If both are not related to each other or one is not found, a HTTP 404 error is
     * returned.
     */
    public function detach(News $news, Attachment $attachment): Response
    {
        $belongs = $news->attachments()->where('id', $attachment->id)->exists();
        if (! $belongs) {
            abort(404, 'No matching attachment could be found!');
        }

        $attachment->detach($news);
        $attachment->delete();

        return response()->noContent();
    }

    /**
     * List all uploads of the specified resource.
     *
     * Returns a list of all files associated to a News entity, including the upload types:
     * - attachment
     * - header
     * - content
     */
    public function listAttachments(Request $request, News $news): JsonResponse
    {
        $query = collect(Validator::make($request->query(), [
            'type' => 'nullable|string|in:content,header,attachment'
        ])->validated());

        /** @var Collection */
        $list = collect($news->attachments)
            ->map(fn (Attachment $val) => [
                'type' => 'attachment',
                'data' => new AttachmentResource($val),
            ]);

        if ($news->header_image != null) {
            $list->add([
                'type' => 'header',
                'data' => [
                    'url' => $news->header_image,
                ],
            ]);
        }

        /** @var Collection */
        $contents = collect(
            Storage::disk('public')->files('news/' . $news->id . '/content')
        )
            ->map(fn (string $path) => url(Storage::url($path)))
            ->map(fn (string $url) => [
                'type' => 'content',
                'data' => [
                    'url' => $url,
                ],
            ]);
        if ($contents->count() > 0) {
            $list = $list->concat($contents);
        }

        $filter = $query->get('type');
        if (is_string($filter)) {
            $list = $list->filter(fn (array $entry) => $entry['type'] === $filter);
        }

        return response()->json($list);
    }

    private function find(string $id, ?string $action = null, bool $allowGuest = false): News
    {
        $query = News::query()
            ->where('id', $id);

        if (Gate::check('news.viewall')) {
            $query = $query->withTrashed();
        }

        $news = $query->firstOrFail();

        if (! $allowGuest) {
            Gate::authorize($action, $news);
        }

        return $news;
    }
}
