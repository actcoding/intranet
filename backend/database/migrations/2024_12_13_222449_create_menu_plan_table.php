<?php

use App\Models\Menu\Menu;
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
        Schema::create('menu_plans', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->foreignIdFor(Menu::class)->constrained()->cascadeOnDelete();
            $table->date('served_at');
            $table->double('price');

            $table->unique(['menu_id', 'served_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_plans');
    }
};
