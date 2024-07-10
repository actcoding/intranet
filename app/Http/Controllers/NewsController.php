<?php

namespace App\Http\Controllers;

use App\Http\Requests\News\NewsStoreRequest;
use App\Http\Requests\News\NewsUpdateRequest;
use App\Models\News;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;

class NewsController extends Controller
{
    /**
     * Display a paginated list of News.
     *
     * @LRDparam page integer|min:1
     * @LRDparam perPage integer|min:1|default:10
     */
    public function index(Request $request): Paginator
    {
        Gate::authorize('viewAny', News::class);

        $query = News::query();

        /** @var User */
        $user = auth()->user();

        if ($user->can('news.viewall')) {
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
        $news = $this->find($id, 'view');

        return response()->json($news);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(NewsUpdateRequest $request, string $id): JsonResponse
    {
        $news = $this->find($id, 'update');

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

    private function find(string $id, string $action): News
    {
        $query = News::query()
            ->where('id', $id);

        /** @var User */
        $user = auth()->user();

        if ($user->can('news.viewall')) {
            $query = $query->withTrashed();
        }

        $news = $query->firstOrFail();

        Gate::authorize($action, $news);

        return $news;
    }
}
