<?php

namespace App\Http\Resources\Traits;

trait ConditionalResourceAccess
{
    /**
     * Conditionally exposes the resource id when the requesting
     * user has the specified permission.
     *
     * @param  $permission  The required permission.
     * @return int The model id.
     */
    public function conditionalId(string $permission)
    {
        return $this->when(auth()->user()?->can($permission) ?? false, fn () => $this->resource->id);
    }
}
