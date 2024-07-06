<?php

use App\Enum\UserStatus;
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
        Schema::table('users', function (Blueprint $table) {
            $statusEnum = collect(UserStatus::cases())->map(fn ($case) => $case->value)->toArray();
            $table->enum('status', $statusEnum)->default(UserStatus::MUST_RESET_PASSWORD);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropColumns('users', 'status');
    }
};
