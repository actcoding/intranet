<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\MealType;
use App\Models\Menu\Meal;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DishUpdateRequest extends FormRequest
{
    public function authorize(Meal $meal): bool
    {
        return $this->user()->can('update', $meal);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|unique:App\Models\Menu\Meal,name',
            'summary' => 'string',
            'type' => [Rule::in([MealType::MAIN, MealType::DESSERT])],
        ];
    }
}
