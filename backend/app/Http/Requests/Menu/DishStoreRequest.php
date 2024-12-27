<?php

namespace App\Http\Requests\Menu;

use App\Enum\Menu\MealType;
use App\Models\Menu\Meal;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DishStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Meal::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|unique:App\Models\Menu\Meal,name',
            'summary' => 'string',
            'type' => ['required', Rule::in([MealType::MAIN, MealType::DESSERT])],
        ];
    }
}
