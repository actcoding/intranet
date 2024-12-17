<?php

namespace App\Enum;

enum EntityStatus: string
{
    case ACTIVE = 'active';
    case DRAFT = 'draft';
    case DELETED = 'deleted';
}
