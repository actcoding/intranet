<?php

namespace Database\Seeders\Policy;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Role $role): void
    {
        $names = [
            'event.viewall',
            'event.create',
            'event.update',
            'event.delete',
            'event.restore',
            'event.forceDelete',
        ];

        foreach ($names as $name) {
            Permission::firstOrCreate([
                'name' => $name,
            ]);
        }
    }
}
