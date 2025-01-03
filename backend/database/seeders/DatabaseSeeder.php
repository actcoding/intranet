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
                UserSeeder::class,
            ],
        );

        if (app()->runningUnitTests() || confirm('Run News seeder?', true)) {
            $this->call(NewsSeeder::class);
        }

        if (app()->runningUnitTests() || confirm('Run Event seeder?', true)) {
            $this->call(EventSeeder::class);
        }

        if (app()->runningUnitTests() || confirm('Run Menu seeder?', true)) {
            $this->call(MenuSeeder::class);
        }
    }
}
