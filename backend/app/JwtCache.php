<?php

namespace App;

use Tymon\JWTAuth\Providers\Storage\Illuminate;

class JwtCache extends Illuminate
{
    public function __construct()
    {
        // https://github.com/tymondesigns/jwt-auth/issues/2254
        $this->cache = cache()->store();
    }

    public function add($key, $value, $minutes)
    {
        // https://github.com/tymondesigns/jwt-auth/issues/2250#issuecomment-2089820816
        parent::add($key, $value, abs($minutes));
    }
}
