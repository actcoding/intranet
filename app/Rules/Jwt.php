<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class Jwt implements ValidationRule
{
    private const REGEX = '/^(?<header>[a-zA-Z0-9-_]+)(?:\.)(?<payload>[a-zA-Z0-9-_]+)(?:\.)(?<signature>[a-zA-Z0-9-_]+)$/';

    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $result = preg_match(self::REGEX, $value, $matches);

        if ($result != 1) {
            $fail('jwt.validation.invalid')->translate();
        }
    }
}
