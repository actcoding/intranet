<?php

use Tests\TestCase;

function test_login(TestCase $case, array $credentials): array
{
    $response = $case->postJson(route('auth.login'), $credentials);

    $response->assertStatus(200);

    [
        'access_token' => $token,
        'token_type' => $type,
    ] = $response->json();

    return [$token, $type];
}
