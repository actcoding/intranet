<?php

use App\Models\Menu\Ingredient;
use App\Models\Menu\Meal;
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
        Schema::create('meal_to_ingredient', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Meal::class);
            $table->foreignIdFor(Ingredient::class);
        });

        Schema::create('menu_to_meal', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Menu::class);
            $table->foreignIdFor(Meal::class);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_to_meal');
        Schema::dropIfExists('meal_to_ingredient');
    }
};
