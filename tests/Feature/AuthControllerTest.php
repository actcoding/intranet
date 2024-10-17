<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Indicates whether the default seeder should run before each test.
     */
    protected bool $seed = true;

    public function test_login_fail(): void
    {
        $response = $this->postJson('/auth/login', [
            'email' => 'admin@example.org',
            'password' => 'wrong',
        ]);
        $response->assertStatus(401);

        $response = $this->postJson('/auth/login', [
            'email' => 'admin@example.org',
        ]);
        $response->assertStatus(422);

        $response = $this->postJson('/auth/login', [
            'email' => 'admin@example.org',
            'password' => '',
        ]);
        $response->assertStatus(422);
    }

    public function test_login(): void
    {
        $response = $this->postJson('/auth/login', [
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'access_token',
            'refresh_token',
            'token_type',
        ]);
    }

    // FIXME: Cache problems in test
    private function _test_invalidate_token(): void
    {
        $response1 = $this->postJson('/auth/login', [
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $response1->assertStatus(200);
        $response1->assertJsonStructure([
            'access_token',
            'refresh_token',
            'token_type',
        ]);

        $this->getJson('/auth/whoami', [
            'Authorization' => 'Bearer ' . $response1->json('access_token'),
        ])->assertStatus(200)->assertJsonPath('email', 'admin@example.org');

        $response2 = $this->postJson('/auth/logout', [
            'refresh_token' => $response1->json('refresh_token'),
        ], [
            'Authorization' => 'Bearer ' . $response1->json('access_token'),
        ]);
        $response2->assertStatus(200);

        $this->getJson('/auth/whoami', [
            'Authorization' => 'Bearer ' . $response1->json('access_token'),
        ])->assertStatus(401);
    }
}
