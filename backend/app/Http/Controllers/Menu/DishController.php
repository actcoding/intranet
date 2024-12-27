<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\DishStoreRequest;
use App\Http\Requests\Menu\DishUpdateRequest;
use App\Http\Resources\Menu\MealResource;
use App\Models\Menu\Meal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class DishController extends Controller
{
    /**
     * Display a paginated list of dishes.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<MealResource>>
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Meal::query()->paginate($request->query('perPage', 10));

        return MealResource::collection($query);
    }

    /**
     * Display the specified dish.
     *
     * @param  int  $id  The dish ID
     */
    public function show(Meal $id): MealResource
    {
        return MealResource::make($id);
    }

    /**
     * Create a new dish.
     */
    public function store(DishStoreRequest $request): MealResource
    {
        $entity = Meal::create($request->validated());

        return MealResource::make($entity);
    }

    /**
     * Update an existing ingredient.
     *
     * @param  int  $id  The ingredient ID
     */
    public function update(DishUpdateRequest $request, $id): MealResource
    {
        $entity = Meal::findOrFail($id);

        $entity->fill($request->validated());

        $entity->save();

        return IngredientResource::make($entity);
    }

    /**
     * Delete an ingredient.
     *
     * @param  int  $id  The ingredient ID
     */
    public function destroy(Request $request, $id): Response
    {
        $entity = Meal::findOrFail($id);

        $entity->delete();

        return response()->noContent();
    }
}
