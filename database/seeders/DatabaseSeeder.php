<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $role = Role::create([
            'name' => 'Admin',
        ]);

        $role->givePermissionTo(Permission::create(['name' => 'create news']));
        $role->givePermissionTo(Permission::create(['name' => 'update news']));
        $role->givePermissionTo(Permission::create(['name' => 'delete news']));

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@example.org',
            'password' => 'password',
        ]);

        $user->assignRole($role);
    }
}
