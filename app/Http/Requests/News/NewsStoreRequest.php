<?php

namespace App\Http\Requests\News;

use App\Enum\NewsStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class NewsStoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', Rule::enum(NewsStatus::class)],
            'title' => 'required|string',
            'content' => 'required|json',
            'header_image' => 'nullable|string',
        ];
    }
}
