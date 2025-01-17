<?php

namespace App\Http\Controllers;

use App\Enum\EntityStatus;
use App\Enum\UploadType;
use App\Http\Requests\News\NewsListRequest;
use App\Http\Requests\News\NewsStoreRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Http\Requests\News\NewsUploadImageRequest;
use App\Http\Resources\AttachmentResource;
use App\Http\Resources\NewsResource;
use App\Http\Resources\UrlResource;
use App\Models\Attachment;
use App\Models\News;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
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
            ->orderByDesc('created_at')
            ->with('attachments');

        if (Gate::check('news.viewall')) {
            if ($request->has('status')) {
                $query = $query->whereStatus($request->input('status'));
            } else {
                $query = $query->withTrashed();
            }
        } else {
            $query = $query->whereStatus(EntityStatus::ACTIVE);
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
        $news = new News($request->validated());
        $news->author_id = auth()->user()->id;

        if ($news->status == EntityStatus::ACTIVE) {
            $news->published_at = now();
        }

        $news->save();
        $news->refresh();

        /**
         * `NewsResource`
         *
         * @status 201
         *
         * @body NewsResource
         */
        return (new NewsResource($news))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * Guests and normal users will only see published news, while a Creator will receive
     * a list of all news.
     *
     * @param  int  $id  The news ID
     *
     * @unauthenticated
     */
    public function show($id): NewsResource
    {
        $news = $this->find($id, allowGuest: true);

        $news->load('attachments');
        $news->load('author');
        $news->load('events');

        return new NewsResource($news);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id  The news ID
     */
    public function update(NewsUpdateRequest $request, $id): NewsResource
    {
        $news = $this->find($id, 'update');

        if ($news->trashed()) {
            abort(403, 'You cannot update trashed news.');
        }

        $news->fill($request->validated());

        if ($news->status == EntityStatus::ACTIVE) {
            if ($news->published_at == null) {
                $news->published_at = now();
            }
        } else {
            $news->published_at = null;
        }

        $news->save();

        return new NewsResource($news);
    }

    /**
     * Delete the specified resource from storage.
     *
     * @param  int  $id  The news ID
     */
    public function destroy(Request $request, $id): Response
    {
        $force = $request->boolean('force', false);

        $news = $this->find($id, $force ? 'forceDelete' : 'delete');

        if (! $force && $news->trashed()) {
            abort(403, 'You cannot delete trashed news.');
        }

        $force ? $news->forceDeleteQuietly() : $news->delete();

        return response()->noContent();
    }

    /**
     * Restore this resource from a deleted state.
     *
     * @param  int  $id  The news ID
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
     * @param  int  $id  The news ID
     */
    public function upload(NewsUploadImageRequest $request, $id): UrlResource
    {
        $news = $this->find($id, 'update');

        $type = $request->input('type');
        $file = $request->file('file');

        // delete old headers
        if ($type == UploadType::HEADER->value) {
            $news->attachments()
                ->whereJsonContains('metadata->type', UploadType::HEADER->value)
                ->delete();
        }

        $path = $file->store('news/' . $id . '/' . $type, 'public');

        /** @var Attachment */
        $attachment = Attachment::create([
            'name' => $file->getClientOriginalName(),
            'type' => $file->getMimeType(),
            'path' => $path,
            'uploader_id' => $request->user()->id,
            'metadata' => [
                'type' => $type,
            ],
        ]);
        $attachment->attach($news);

        return new UrlResource($path);
    }

    /**
     * Delete an attachment from the specified resource.
     *
     * Deletes the specified attachment associated to the given News entity.
     * If both are not related to each other or one is not found, a HTTP 404 error is
     * returned.
     *
     * @param  int  $id  The news ID
     */
    public function detach($id, Attachment $attachment): Response
    {
        $news = $this->find($id, 'delete');

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
     *
     * @param  int  $id  The news ID
     * @return AnonymousResourceCollection<AttachmentResource>
     */
    public function listAttachments(Request $request, $id)
    {
        $news = $this->find($id, allowGuest: true);

        $query = collect(Validator::make($request->query(), [
            'type' => 'nullable|string|in:content,header,attachment',
        ])->validated());

        return AttachmentResource::collection($news->attachments);
    }

    private function find(string $id, ?string $action = null, bool $allowGuest = false): News
    {
        $query = News::query()
            ->where('id', $id);

        if (Auth::guest()) {
            $query = $query->whereStatus(EntityStatus::ACTIVE);
        } elseif (Gate::check('news.viewall')) {
            $query = $query->withTrashed();
        }

        $news = $query->firstOrFail();

        if (! $allowGuest) {
            Gate::authorize($action, $news);
        }

        return $news;
    }
}
