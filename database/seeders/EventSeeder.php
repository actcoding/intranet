<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::factory()
            ->count(3)
            ->create();

        Event::factory()
            ->count(3)
            ->create([
                'published_at' => now(),
            ]);
    }
}
