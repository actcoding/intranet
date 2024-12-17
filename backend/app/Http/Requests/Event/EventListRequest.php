<?php

namespace App\Http\Requests\Event;

use App\Enum\EntityStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventListRequest extends FormRequest
{
    /**
     * Get data to be validated from the request.
     *
     * @return array
     */
    public function validationData(): string|array|null
    {
        return $this->query();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'page' => 'integer|min:1',
            'perPage' => 'integer|min:1',
            'status' => Rule::enum(EntityStatus::class),

            /** The year in which the event starts or ends. */
            'year' => 'integer',

            /** The month in which the event starts or ends. */
            'month' => 'integer|min:1|max:12',
        ];
    }
}
