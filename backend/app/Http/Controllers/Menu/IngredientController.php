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

class IngredientController extends Controller
{
    /**
     * Display a list of ingredients.
     *
     * @return AnonymousResourceCollection<IngredientResource>
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Ingredient::all();

        return IngredientResource::collection($query);
    }

    /**
     * Display the specified ingredient.
     *
     * @param  $ingredient  The ingredient ID
     */
    public function show(Ingredient $ingredient): IngredientResource
    {
        return IngredientResource::make($ingredient);
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
     * @param  $ingredient  The ingredient ID
     */
    public function update(IngredientUpdateRequest $request, Ingredient $ingredient): IngredientResource
    {
        $ingredient->fill($request->validated());

        $ingredient->save();

        return IngredientResource::make($ingredient);
    }

    /**
     * Delete an ingredient.
     *
     * @param  $ingredient  The ingredient ID
     */
    public function destroy(Request $request, Ingredient $ingredient): Response
    {
        $ingredient->delete();

        return response()->noContent();
    }
}
