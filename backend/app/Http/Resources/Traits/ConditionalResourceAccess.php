<?php

namespace App\Http\Resources\Traits;

trait ConditionalResourceAccess
{
    public function conditionalId(string $permission): int
    {
        return $this->when(auth()->user()?->can($permission) ?? false, fn () => $this->resource->id);
    }
}
