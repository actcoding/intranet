<?php

namespace App\Http\Requests\Link;

use Illuminate\Foundation\Http\FormRequest;

class AttachRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            /** The ID of a News entity. */
            'news_id' => 'required|integer|exists:App\Models\News,id',

            /** The ID of an Event entity. */
            'event_id' => 'required|integer|exists:App\Models\Event,id',
        ];
    }
}
