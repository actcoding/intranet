<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\IngredientStoreRequest;
use App\Http\Requests\Menu\IngredientUpdateRequest;
use App\Http\Resources\Menu\IngredientResource;
use App\Models\Menu\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;

class IngredientController extends Controller
{
    /**
     * Display a paginated list of ingredients.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<IngredientResource>>
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Ingredient::query()->paginate($request->query('perPage', 10));

        return IngredientResource::collection($query);
    }

    /**
     * Display the specified ingredient.
     *
     * @param  int  $id  The news ID
     */
    public function show(Ingredient $id): IngredientResource
    {
        return IngredientResource::make($id);
    }

    /**
     * Create a new ingredient.
     */
    public function store(IngredientStoreRequest $request): IngredientResource
    {
        $entity = Ingredient::create($request->validated());

        return IngredientResource::make($entity);
    }

    /**
     * Update an existing ingredient.
     *
     * @param  int  $id  The ingredient ID
     */
    public function update(IngredientUpdateRequest $request, $id): IngredientResource
    {
        $entity = Ingredient::findOrFail($id);

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
        $entity = Ingredient::findOrFail($id);

        $entity->delete();

        return response()->noContent();
    }
}
