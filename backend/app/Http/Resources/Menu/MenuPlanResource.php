<?php

namespace App\Http\Resources\Menu;

use App\Http\Resources\Traits\ConditionalResourceAccess;
use App\Models\Menu\MenuPlan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MenuPlanResource extends JsonResource
{
    use ConditionalResourceAccess;

    /**
     * The resource instance.
     *
     * @var MenuPlan
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
            'id' => $this->conditionalId('menu.plan.viewall'),
            'updated_at' => $this->resource->updated_at,
            'served_at' => date_format($this->resource->served_at, 'Y-m-d'),
            'price' => $this->resource->price,

            'menu' => MenuResource::make($this->resource->menu)->withHidden('default_price'),
        ];
    }
}
