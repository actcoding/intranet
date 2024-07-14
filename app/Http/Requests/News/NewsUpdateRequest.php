<?php

namespace App\Http\Requests\News;

use App\Enum\NewsStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'status' => [Rule::enum(NewsStatus::class)],
            'title' => 'string',
            'content' => 'string',
            'header_image' => 'nullable|string',
        ];
    }
}
