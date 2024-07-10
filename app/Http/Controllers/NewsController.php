<?php

namespace App\Http\Controllers;

use App\Http\Requests\News\NewsStoreRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Models\News;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

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
     * @LRDparam page integer|min:1
     * @LRDparam perPage integer|min:1|default:10
     */
    public function index(Request $request): Paginator
    {
        $query = News::query();

        if (Gate::check('news.viewall')) {
            $query = $query->withTrashed();
        }

        return $query->simplePaginate($request->query('perPage', 10));
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

        return response()->json($news->fresh(), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $news = $this->find($id, allowGuest: true);

        return response()->json($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewsUpdateRequest $request, string $id): JsonResponse
    {
        $news = $this->find($id, 'update');

        if ($news->trashed()) {
            return response()->json(['message' => 'You cannot update trashed news.'], status: 403);
        }

        $news->fill($request->validated());
        $news->save();

        return response()->json($news);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): Response|ResponseFactory
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

    public function restore(Request $request, string $id)
    {
        $news = $this->find($id, 'restore');

        $news->restore();

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
