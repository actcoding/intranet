<?php

namespace App\Http\Resources\Menu;

use App\Http\Resources\Traits\ConditionalResourceAccess;
use App\Models\Menu\Meal;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DishResource extends JsonResource
{
    use ConditionalResourceAccess;

    /**
     * The resource instance.
     *
     * @var Meal
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->conditionalId('menu.dish.viewall'),
            'name' => $this->resource->name,
            'summary' => $this->resource->summary,
            'type' => $this->resource->type,
            'low_carb' => $this->resource->low_carb,

            'notes' => $this->whenLoaded('ingredients', fn () => IngredientResource::collection($this->resource->ingredients)),
        ];
    }
}
