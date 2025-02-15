<?php

namespace App\Http\Resources\Menu;

use App\Enum\Menu\IngredientType;
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
            /** @var int */
            'id' => $this->resource->id,
            'name' => $this->resource->name,
            /** @var IngredientType */
            'type' => $this->resource->type,
        ];
    }
}
