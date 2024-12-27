<?php

namespace App\Http\Resources\Menu;

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
            'id' => $this->conditionalId('menu.menu.viewall'),
            'nutrition' => $this->resource->nutrition,
            'name' => $this->resource->name,
            'default_price' => $this->whenVisible('default_price'),

            'meals' => $this->whenLoaded('meals', fn () => MealResource::collection($this->resource->meals)),
        ];
    }
}
