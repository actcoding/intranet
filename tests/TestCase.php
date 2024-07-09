<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    final protected function login(array $credentials): array
    {
        $response = $this->postJson(route('auth.login'), $credentials);

        $response->assertStatus(200);

        [
            'access_token' => $token,
            'token_type' => $type,
        ] = $response->json();

        return [$token, $type];
    }
}
