<?php

namespace Database\Seeders;

use App\Enum\Menu\IngredientType;
use App\Enum\Menu\MenuKind;
use App\Enum\Menu\MenuNutrition;
use App\Models\Menu\Ingredient;
use App\Models\Menu\Meal;
use App\Models\Menu\Menu;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allergen = Ingredient::create([
            'name' => 'Nüsse',
            'type' => IngredientType::ALLERGEN,
        ]);

        $meal = Meal::create([
            'name' => 'Schnitzel ungarische Art',
            'summary' => 'Schnitzel mit pikanter Tomatensauce, dazu Pommes und Salat'
        ]);

        $menu = Menu::create([
            'nutrition' => MenuNutrition::OMNIVOROUS,
            'kind' => MenuKind::MAIN,
            'name' => 'Schnitzel ungarische Art',
            'summary' => 'Lost',
            'default_price' => 9.99,
        ]);

        DB::table('meal_to_ingredient')->insert( [
            'meal_id' => $meal->id,
            'ingredient_id' => $allergen->id,
        ]);

        DB::table('menu_to_meal')->insert([
            'meal_id' => $meal->id,
            'menu_id' => $menu->id,
        ]);
    }
}
