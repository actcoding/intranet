<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\DishType;
use App\Models\Menu\Dish;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DishStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Dish::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:App\Models\Menu\Dish,name',
            'summary' => 'string',
            'type' => ['required', Rule::in([DishType::MAIN, DishType::DESSERT])],

            /**
             * A list of ingredient IDs to associate
             *
             * @var int[]
             */
            'ingredients' => 'array|exists:App\Models\Menu\Ingredient,id',
        ];
    }
}
