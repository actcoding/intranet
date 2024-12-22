<?php

namespace Tests\Feature;

use App\Enum\EntityStatus;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Indicates whether the default seeder should run before each test.
     */
    protected bool $seed = true;

    public function test_require_authentication(): void
    {
        $response = $this->postJson(route('event.store'), [
            'title' => 'Hello World',
            'content' => [],
        ]);

        $response->assertStatus(401);
    }

    public function test_creator_can(): void
    {
        [$token, $type] = $this->login([
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $response = $this->postJson(route('event.store'), [
            'title' => 'Hello World',
            'content' => '[]',
            'starting_at' => now()->toDateTimeString(),
            'ending_at' => now()->addDay()->toDateTimeString(),
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $response->assertStatus(201);
    }

    public function test_user_cannot(): void
    {
        [$token, $type] = $this->login([
            'email' => 'spastus@example.org',
            'password' => 'spast',
        ]);

        $response = $this->postJson(route('event.store'), [
            'title' => 'Hello World',
            'content' => '[]',
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $response->assertStatus(403);
    }

    public function test_crud(): void
    {
        [$token, $type] = $this->login([
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $responseStore = $this->postJson(route('event.store'), [
            'title' => 'Hello World',
            'content' => '[]',
            'starting_at' => now()->toDateTimeString(),
            'ending_at' => now()->addDay()->toDateTimeString(),
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $responseStore->assertStatus(201);
        $responseStore->assertJsonStructure([
            'id',
            'created_at',
            'updated_at',
            'status',
            'title',
            'content',
        ]);

        $responseUpdate = $this->putJson(route('event.update', ['event' => $responseStore->json('id')]), [
            'status' => EntityStatus::ACTIVE,
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $responseUpdate->assertStatus(200);

        $responseShow = $this->getJson(route('event.show', ['event' => $responseStore->json('id')]));

        $responseShow->assertStatus(200);
        $responseShow->assertJsonPath('status', EntityStatus::ACTIVE->value);

        $responseDestroy = $this->deleteJson(route('event.destroy', ['event' => $responseStore->json('id')]), headers: [
            'Authorization' => $type . ' ' . $token,
        ]);

        $responseDestroy->assertStatus(204);

        $responseRestore = $this->patchJson(route('event.restore', ['event' => $responseStore->json('id')]), headers: [
            'Authorization' => $type . ' ' . $token,
        ]);

        $responseRestore->assertStatus(204);

        $responseShow = $this->getJson(route('event.show', ['event' => $responseStore->json('id')]));

        $responseShow->assertStatus(200);
        $responseShow->assertJsonPath('status', EntityStatus::DRAFT->value);

        $responseDestroyForce = $this->deleteJson(route('event.destroy', ['event' => $responseStore->json('id')]), [
            'force' => true,
        ], [
            'Authorization' => $type . ' ' . $token,
        ]);

        $responseDestroyForce->assertStatus(204);

        $responseShow = $this->getJson(route('event.show', ['event' => $responseStore->json('id')]));

        $responseShow->assertStatus(404);
    }
}
