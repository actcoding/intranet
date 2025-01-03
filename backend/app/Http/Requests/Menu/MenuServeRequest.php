<?php

namespace App\Http\Requests\Menu;

use App\Models\Menu\MenuPlan;
use Illuminate\Foundation\Http\FormRequest;

class MenuServeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', MenuPlan::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            /** The ID of a menu to serve. */
            'menu_id' => 'required|exists:App\Models\Menu\Menu,id',

            'served_at' => 'required|date_format:Y-m-d',
            'price' => 'decimal:0,2',
        ];
    }
}
