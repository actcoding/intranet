<?php

namespace App\Http\Resources\Menu;

use App\Enum\Menu\MenuNutrition;
use App\Http\Resources\Traits\ConditionalResourceAccess;
use App\Http\Resources\Traits\HasHiddenAttributes;
use App\Models\Menu\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuResource extends JsonResource
{
    use ConditionalResourceAccess,
        HasHiddenAttributes;

    /**
     * The resource instance.
     *
     * @var Menu
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
            /** @var MenuNutrition */
            'nutrition' => $this->resource->nutrition,
            'name' => $this->resource->name,
            /** @var float */
            'default_price' => $this->whenVisible('default_price'),

            'dishes' => $this->whenLoaded('dishes', fn () => DishResource::collection($this->resource->dishes)),
        ];
    }
}
