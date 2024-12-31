<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\IngredientType;
use App\Models\Menu\Ingredient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IngredientStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Ingredient::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:App\Models\Menu\Ingredient,name',
            'type' => ['required', Rule::in([IngredientType::ALLERGEN, IngredientType::ADDITIVE])],
        ];
    }
}
