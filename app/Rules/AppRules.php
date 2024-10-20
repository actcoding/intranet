<?php

namespace App\Rules;

use App\Enum\EntityStatus;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

class AppRules
{
    public static function entityStatus(): In
    {
        return Rule::in(EntityStatus::ACTIVE, EntityStatus::DRAFT);
    }
}
