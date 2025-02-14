<?php

namespace App\Http\Requests\Event;

use App\Models\Event;
use App\Rules\AppRules;
use Illuminate\Foundation\Http\FormRequest;

class EventStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Event::class);
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
            'starting_at' => 'required|date',
            'ending_at' => 'required|date',
            'is_all_day' => 'required|boolean',
            'title' => 'required|string',
            'content' => 'required|string',
        ];
    }
}
