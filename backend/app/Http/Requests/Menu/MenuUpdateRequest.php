<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\MenuNutrition;
use App\Models\Menu\Menu;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuUpdateRequest extends FormRequest
{
    public function authorize(Menu $menu): bool
    {
        return $this->user()->can('update', $menu);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $nuts = collect(MenuNutrition::cases())->map(fn (MenuNutrition $nut) => $nut->value);

        return [
            'name' => 'string',
            'nutrition' => [Rule::in($nuts)],
            'default_price' => 'decimal:0,2',

            /**
             * A list of dish IDs to associate
             *
             * @var int[]
             */
            'dishes' => 'array|exists:App\Models\Menu\Dish,id',
        ];
    }
}
