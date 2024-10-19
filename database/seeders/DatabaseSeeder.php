<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use function Laravel\Prompts\confirm;

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

                UserSeeder::class,
            ],
        );

        if (confirm('Run News seeder?', true)) {
            $this->call(NewsSeeder::class);
        }

        if (confirm('Run Event seeder?', true)) {
            $this->call(EventSeeder::class);
        }
    }
}
