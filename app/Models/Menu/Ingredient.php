<?php

namespace App\Models\Menu;

use App\Enum\Menu\IngredientType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Ingredient extends Model
{
    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'type' => IngredientType::class,
        ];
    }

    public function meals(): BelongsToMany
    {
        return $this->belongsToMany(Meal::class, 'meal_to_ingredient');
    }
}
