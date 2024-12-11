<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PasswordResetRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $base = [
            'password' => 'required|min:8|confirmed',
        ];

        if (Auth::guest()) {
            return array_merge($base, [
                'token' => 'required',
            ]);
        }

        return $base;
    }
}
