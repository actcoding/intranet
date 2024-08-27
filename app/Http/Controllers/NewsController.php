<?php

namespace App\Http\Controllers;

use App\Enum\NewsStatus;
use App\Http\Requests\News\NewsListRequest;
use App\Http\Requests\News\NewsStoreRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Http\Requests\News\UploadImageRequest;
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
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class NewsController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show']),
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
    public function update(NewsUpdateRequest $request, $id): Response|JsonResponse
    {
        $news = $this->find($id, 'update');

        if ($news->trashed()) {
            return response()->json(['message' => 'You cannot update trashed news.'], status: 403);
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
    public function destroy(Request $request, $id): Response|JsonResponse
    {
        $force = $request->boolean('force', false);

        $news = $this->find($id, $force ? 'forceDelete' : 'delete');

        if ($news->trashed()) {
            return response()->json(['message' => 'You cannot deleted trashed news.'], status: 403);
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
     * Uploads a file to the scope of a news article.
     *
     * @param  int  $id
     */
    public function upload(UploadImageRequest $request, $id): JsonResponse
    {
        $news = $this->find($id, 'update');

        $type = $request->input('type');
        $file = $request->file('file');

        $path = $file->store('news/' . $id, 'public');

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
     * Remove an attachment.
     */
    public function detach(News $news, Attachment $attachment)
    {
        $attachment->detach($news);
        $attachment->delete();

        return response()->noContent();
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
