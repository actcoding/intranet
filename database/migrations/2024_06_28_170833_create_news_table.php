<?php

use App\Enum\EntityStatus;
use App\Models\User;
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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->timestamp('published_at')->nullable();

            $table->foreignIdFor(User::class, 'author_id')->constrained()->restrictOnDelete();

            $statusEnum = collect(EntityStatus::cases())->map(fn ($case) => $case->value)->toArray();
            $table->enum('status', $statusEnum)->default(EntityStatus::DRAFT);
            $table->text('title');
            $table->longText('content');
            $table->string('header_image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
