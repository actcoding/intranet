<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\DishType;
use App\Models\Menu\Dish;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DishUpdateRequest extends FormRequest
{
    public function authorize(Dish $dish): bool
    {
        return $this->user()->can('update', $dish);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string',
            'summary' => 'string',
            'type' => [Rule::in([DishType::MAIN, DishType::DESSERT])],

            /**
             * A list of ingredient IDs to associate
             *
             * @var int[]
             */
            'ingredients' => 'array|exists:App\Models\Menu\Ingredient,id',
        ];
    }
}
