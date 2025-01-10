<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\IngredientType;
use App\Models\Menu\Ingredient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IngredientUpdateRequest extends FormRequest
{
    public function authorize(Ingredient $ingredient): bool
    {
        return $this->user()->can('update', $ingredient);
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
            'type' => [Rule::in([IngredientType::ALLERGEN, IngredientType::ADDITIVE])],
        ];
    }
}
