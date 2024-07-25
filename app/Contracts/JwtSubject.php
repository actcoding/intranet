<?php

namespace App\Contracts;

interface JwtSubject
{
    /**
     * Returns an array of custom claims to be included in a token.
     *
     * @return array<string, mixed>
     */
    public function getClaims(): array;
}
