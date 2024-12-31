<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\DishStoreRequest;
use App\Http\Requests\Menu\DishUpdateRequest;
use App\Http\Resources\Menu\DishResource;
use App\Models\Menu\Dish;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @tags Canteen
 */
class DishController extends Controller
{
    /**
     * Display a paginated list of dishes.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<DishResource>>
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Dish::query()->paginate($request->query('perPage', 10));

        return DishResource::collection($query);
    }

    /**
     * Display the specified dish.
     *
     * @param  $dish  The dish ID
     */
    public function show(Dish $dish): DishResource
    {
        $dish->load('ingredients');

        return DishResource::make($dish);
    }

    /**
     * Create a new dish.
     */
    public function store(DishStoreRequest $request): DishResource
    {
        /** @var Dish */
        $entity = Dish::create($request->validated());

        if ($request->has('ingredients')) {
            $entity->ingredients()->sync($request->input('ingredients'));
        }

        $entity->load('ingredients');

        return DishResource::make($entity);
    }

    /**
     * Update an existing dish.
     *
     * @param  $dish  The dish ID
     */
    public function update(DishUpdateRequest $request, Dish $dish): DishResource
    {
        $dish->fill($request->validated());

        if ($request->has('ingredients')) {
            $dish->ingredients()->sync($request->input('ingredients'));
        }

        $dish->save();

        $dish->load('ingredients');

        return DishResource::make($dish);
    }

    /**
     * Delete a dish.
     *
     * @param  $dish  The dish ID
     */
    public function destroy(Request $request, Dish $dish): Response
    {
        $dish->delete();

        return response()->noContent();
    }
}
