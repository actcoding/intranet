<?php

namespace App\Http\Requests\News;

use App\Rules\AppRules;
use Illuminate\Foundation\Http\FormRequest;

class NewsUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', AppRules::entityStatus()],
            'title' => 'string',
            'content' => 'string',
        ];
    }
}
