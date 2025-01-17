<?php

namespace App\Models\Menu;

use App\Enum\Menu\MenuNutrition;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Menu extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'nutrition',
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
            'default_price' => 'decimal:2',
        ];
    }

    /**
     * All of the relationships to be touched.
     *
     * @var array
     */
    protected $touches = ['plans'];

    public function dishes(): BelongsToMany
    {
        return $this->belongsToMany(Dish::class, 'menu_to_dish');
    }

    public function plans(): HasMany
    {
        return $this->hasMany(MenuPlan::class);
    }
}
