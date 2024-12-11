<?php

namespace App\Enum\Menu;

enum IngredientType: string
{
    case DEFAULT = 'default';
    case ALLERGEN = 'allergen';
    case ADDITIVE = 'additive';
}
