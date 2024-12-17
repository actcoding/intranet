<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropColumns('news', 'header_image');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news')->string('header_image')->nullable();
    }
};
