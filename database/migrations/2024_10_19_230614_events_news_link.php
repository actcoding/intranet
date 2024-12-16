<?php

use App\Models\Event;
use App\Models\News;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(News::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Event::class)->constrained()->cascadeOnDelete();

            $table->unique(['news_id', 'event_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_news');
    }
};
