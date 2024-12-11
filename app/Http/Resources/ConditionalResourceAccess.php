<?php

namespace App\Http\Resources;

trait ConditionalResourceAccess {

    public function conditionalId(string $permission)
    {
        return $this->when(auth()->user()?->can($permission) ?? false, fn () => $this->resource->id);
    }
}
