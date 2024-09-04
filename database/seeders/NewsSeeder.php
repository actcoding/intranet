<?php

namespace Database\Seeders;

use App\Enum\NewsStatus;
use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        News::factory()
            ->count(3)
            ->create();

        News::factory()
            ->count(3)
            ->create([
                'status' => NewsStatus::ACTIVE,
                'published_at' => now(),
            ]);
    }
}
