<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\MenuNutrition;
use App\Models\Menu\Menu;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MenuStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Menu::class);
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
            'name' => 'required|string|unique:App\Models\Menu\Menu,name',
            'nutrition' => ['required', Rule::in($nuts)],
            'default_price' => 'required|decimal:0,2',

            /**
             * A list of dish IDs to associate
             *
             * @var int[]
             */
            'dishes' => 'array|exists:App\Models\Menu\Dish,id',
        ];
    }
}
