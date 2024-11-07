<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

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

        DB::table('event_news')->insert([
            'event_id' => 1,
            'news_id' => 1,
        ]);
    }
}
