<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
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
