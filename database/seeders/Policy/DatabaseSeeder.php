<?php

namespace Database\Seeders\Policy;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $role = Role::firstOrCreate([
            'name' => 'Creator',
        ]);

        $this->call(
            class: [
                NewsSeeder::class,
                EventSeeder::class,
            ],
            parameters: [
                $role,
            ],
        );

        $role->givePermissionTo(Permission::all());

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
