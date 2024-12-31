<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\MenuStoreRequest;
use App\Http\Requests\Menu\MenuUpdateRequest;
use App\Http\Resources\Menu\MenuResource;
use App\Models\Menu\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @tags Canteen
 */
class MenuController extends Controller
{
    /**
     * Display a paginated list of menus.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<MenuResource>>
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Menu::query()->paginate($request->query('perPage', 10));

        return MenuResource::collection($query);
    }

    /**
     * Display the specified menu.
     *
     * @param  $menu  The menu ID
     */
    public function show(Menu $menu): MenuResource
    {
        $menu->load(['dishes', 'dishes.ingredients']);

        return MenuResource::make($menu);
    }

    /**
     * Create a new menu.
     */
    public function store(MenuStoreRequest $request): MenuResource
    {
        /** @var Menu */
        $entity = Menu::create($request->validated());

        if ($request->has('dishes')) {
            $entity->dishes()->sync($request->input('dishes'));
        }

        $entity->load('dishes');

        return MenuResource::make($entity);
    }

    /**
     * Update an existing menu.
     *
     * @param  $menu  The menu ID
     */
    public function update(MenuUpdateRequest $request, Menu $menu): MenuResource
    {
        $menu->fill($request->validated());

        if ($request->has('dishes')) {
            $menu->dishes()->sync($request->input('dishes'));
        }

        $menu->save();

        $menu->load('dishes');

        return MenuResource::make($menu);
    }

    /**
     * Delete a menu.
     *
     * @param  $menu  The menu ID
     */
    public function destroy(Request $request, Menu $menu): Response
    {
        $menu->delete();

        return response()->noContent();
    }
}
