<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(
            class: [
                Policy\DatabaseSeeder::class,

                NewsSeeder::class,
            ],
        );

        $user = User::factory()->create([
            'name' => 'Primus',
            'email' => 'admin@example.org',
            'password' => 'admin',
        ]);

        $user->assignRole(Role::whereName('Creator')->first());

        $user2 = User::factory()->create([
            'name' => 'Spastus',
            'email' => 'spastus@example.org',
            'password' => 'spast',
        ]);
    }
}
