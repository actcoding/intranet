<?php

namespace App\Models\Menu;

use App\Enum\Menu\MealType;
use App\Enum\Menu\MenuNutrition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Menu extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nutrition',
        'name',
        'default_price',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'nutrition' => MenuNutrition::class,
            'kind' => MealType::class,
            'default_price' => 'double',
        ];
    }

    public function meals(): BelongsToMany
    {
        return $this->belongsToMany(Meal::class, 'menu_to_meal');
    }
}
