<?php

namespace App\Http\Resources\Menu;

use App\Enum\Menu\DishType;
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
            /** @var int */
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            'summary' => $this->resource->summary,
            /** @var DishType */
            'type' => $this->resource->type,

            /**
             * @var bool
             *
             * @example false
             */
            'low_carb' => $this->resource->low_carb,

            'notes' => $this->whenLoaded('ingredients', fn () => IngredientResource::collection($this->resource->ingredients)),
        ];
    }
}
