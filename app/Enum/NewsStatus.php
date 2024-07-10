<?php

namespace App\Enum;

enum NewsStatus: string
{
    case ACTIVE = 'active';
    case DRAFT = 'draft';
    case DELETED = 'deleted';
}
