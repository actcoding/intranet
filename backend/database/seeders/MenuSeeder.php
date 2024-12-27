<?php

namespace Database\Seeders;

use App\Enum\Menu\IngredientType;
use App\Enum\Menu\MealType;
use App\Enum\Menu\MenuNutrition;
use App\Models\Menu\Ingredient;
use App\Models\Menu\Meal;
use App\Models\Menu\Menu;
use App\Models\Menu\MenuPlan;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allergen1 = Ingredient::create([
            'name' => 'Nüsse',
            'type' => IngredientType::ALLERGEN,
        ]);
        $allergen2 = Ingredient::create([
            'name' => 'Gluten',
            'type' => IngredientType::ALLERGEN,
        ]);
        $allergen3 = Ingredient::create([
            'name' => 'Geschmacksverstärker',
            'type' => IngredientType::ADDITIVE,
        ]);

        $meal1 = Meal::create([
            'name' => 'Schnitzel ungarische Art',
            'summary' => 'Schnitzel mit pikanter Tomatensauce, dazu Pommes und Salat',
            'type' => MealType::MAIN,
        ]);

        $meal2 = Meal::create([
            'name' => 'Himbeerdpudding',
            'summary' => 'Lockerer Himbeer-Sahne-Pudding',
            'type' => MealType::DESSERT,
        ]);

        $menu = Menu::create([
            'nutrition' => MenuNutrition::OMNIVOROUS,
            'name' => 'Schnitzelmenü 1',
            'default_price' => 9.99,
        ]);

        MenuPlan::create([
            'menu_id' => $menu->id,
            'served_at' => now(),
            'price' => 5.99,
        ]);

        DB::table('meal_to_ingredient')->insert([
            'meal_id' => $meal1->id,
            'ingredient_id' => $allergen1->id,
        ]);
        DB::table('meal_to_ingredient')->insert([
            'meal_id' => $meal2->id,
            'ingredient_id' => $allergen2->id,
        ]);
        DB::table('meal_to_ingredient')->insert([
            'meal_id' => $meal2->id,
            'ingredient_id' => $allergen3->id,
        ]);

        DB::table('menu_to_meal')->insert([
            'meal_id' => $meal1->id,
            'menu_id' => $menu->id,
        ]);
        DB::table('menu_to_meal')->insert([
            'meal_id' => $meal2->id,
            'menu_id' => $menu->id,
        ]);
    }
}
