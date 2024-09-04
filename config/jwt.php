<?php

use Carbon\CarbonInterval;

return [
    'key' => env('JWT_KEY'),

    'ttl' => [
        'access_token' => env('JWT_TTL_ACCESS_TOKEN', '5 minutes'),
        'refresh_token' => env('JWT_TTL_REFRESH_TOKEN', '1 week'),
        'blacklist' => env('JWT_TTL_BLACKLIST', CarbonInterval::year()->total('seconds')),
    ],
];
