<?php

namespace App\Enum;

enum UploadType : string
{
    case ATTACHMENT = 'attachment';
    case HEADER = 'header';
    case CONTENT = 'content';
}