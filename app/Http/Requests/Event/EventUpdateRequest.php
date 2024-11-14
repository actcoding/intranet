<?php

namespace App\Http\Requests\Event;

use App\Rules\AppRules;
use Illuminate\Foundation\Http\FormRequest;

class EventUpdateRequest extends FormRequest
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
            'starting_at' => 'date',
            'ending_at' => 'date',
            'title' => 'string',
            'content' => 'string',
        ];
    }
}
