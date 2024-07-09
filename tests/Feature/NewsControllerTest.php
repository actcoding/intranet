<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Indicates whether the default seeder should run before each test.
     */
    protected bool $seed = true;

    public function test_require_authentication(): void
    {
        $response = $this->postJson(route('news.store'), [
            'title' => 'Hello World',
            'content' => [],
        ]);

        $response->assertStatus(401);
    }

    public function test_creator_can(): void
    {
        [$token, $type] = test_login($this, [
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $response = $this->postJson(route('news.store'), [
            'title' => 'Hello World',
            'content' => '[]',
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $response->assertStatus(201);
    }

    public function test_user_cannot(): void
    {
        [$token, $type] = test_login($this, [
            'email' => 'spastus@example.org',
            'password' => 'spast',
        ]);

        $response = $this->postJson(route('news.store'), [
            'title' => 'Hello World',
            'content' => '[]',
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $response->assertStatus(403);
    }
}
