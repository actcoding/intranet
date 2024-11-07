<?php

namespace App\Http\Requests\News;

use App\Models\News;
use App\Rules\AppRules;
use Illuminate\Foundation\Http\FormRequest;

class NewsStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', News::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => ['nullable', AppRules::entityStatus()],
            'title' => 'required|string',
            'content' => 'required|string',
        ];
    }
}
