<?php

namespace App\Enum;

enum UserStatus: string
{
    case ACTIVE = 'active';
    case DISABLED = 'disabled';
    case MUST_RESET_PASSWORD = 'must_reset_password';
}
