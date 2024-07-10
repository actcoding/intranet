<?php

namespace Database\Seeders\Policy;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(Role $role): void
    {
        $names = [
            'news.viewall',
            'news.create',
            'news.update',
            'news.delete',
            'news.restore',
            'news.forceDelete',
        ];

        foreach ($names as $name) {
            Permission::firstOrCreate([
                'name' => $name,
            ]);
        }
    }
}
