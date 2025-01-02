<?php

namespace App\Http\Requests\Menu;

use Illuminate\Foundation\Http\FormRequest;

class MenuPlanRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            /** @example 2024-12-01 */
            'from' => 'required|date_format:Y-m-d',

            /** @example 2024-12-31 */
            'to' => 'required|date_format:Y-m-d',
        ];
    }
}
