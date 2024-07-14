<?php

namespace App\Http\Controllers;

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
     * @unauthenticated
     *
     * @response Paginator<NewsResource>
     */
    public function index(NewsListRequest $request): AnonymousResourceCollection
    {
        $query = News::query()
            ->with('attachments');

        if (Gate::check('news.viewall')) {
            $query = $query->withTrashed();
        }

        return NewsResource::collection(
            $query->simplePaginate($request->query('perPage', 10))
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
        $news->save();
        $news->refresh();

        return response()->json($news, 201);
    }

    /**
     * Display the specified resource.
     *
     * @unauthenticated
     *
     * @response NewsResource
     */
    public function show(string $id): NewsResource
    {
        $news = $this->find($id, allowGuest: true);

        $news->load('attachments');
        $news->load('author');

        return new NewsResource($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewsUpdateRequest $request, string $id): Response
    {
        $news = $this->find($id, 'update');

        if ($news->trashed()) {
            return response()->json(['message' => 'You cannot update trashed news.'], status: 403);
        }

        $news->fill($request->validated());
        $news->save();

        return response()->noContent();
    }

    /**
     * Delete the specified resource from storage.
     */
    public function destroy(Request $request, string $id): Response
    {
        $force = $request->boolean('force', false);

        if ($force) {
            $news = $this->find($id, 'forceDelete');
            $news->forceDeleteQuietly();
        } else {
            $news = $this->find($id, 'delete');
            $news->delete();
        }

        return response()->noContent();
    }

    /**
     * Restore this resource from a deleted state.
     */
    public function restore(string $id): Response
    {
        $news = $this->find($id, 'restore');

        $news->restore();

        return response()->noContent();
    }

    /**
     * Uploads a file to the scope of a news article.
     */
    public function upload(UploadImageRequest $request, string $id): JsonResponse
    {
        $news = $this->find($id, 'update');

        $type = $request->input('type');
        $file = $request->file('file');

        if ($type == 'attachment') {
            $path = $file->store('news/' . $id, 'public');

            /** @var Attachment */
            $attachment = Attachment::create([
                'name' => $file->getClientOriginalName(),
                'type' => $file->getMimeType(),
                'path' => $path,
            ]);
            $attachment->attach($news);
        } elseif ($type == 'header') {
            Storage::disk('public')->delete($news->getRawOriginal('header_image'));

            $path = $file->store('news/' . $id, 'public');
            $news->header_image = $path;
            $news->save();
        }

        return response()->json(['path' => url(Storage::url($path))]);
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
