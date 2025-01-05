<?php

namespace App\Http\Resources\Menu;

use App\Http\Resources\Traits\ConditionalResourceAccess;
use App\Models\Menu\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IngredientResource extends JsonResource
{
    use ConditionalResourceAccess;

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
            'id' => $this->conditionalId('menu.ingredient.viewall'),
            'name' => $this->resource->name,
            'type' => $this->resource->type,
        ];
    }
}
