<?php

namespace App\Rules;

use App\Enum\NewsStatus;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\In;

class AppRules
{
    public static function newsStatus(): In
    {
        return Rule::in(NewsStatus::ACTIVE, NewsStatus::DRAFT);
    }
}
