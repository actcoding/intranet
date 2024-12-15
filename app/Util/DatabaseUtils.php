<?php

namespace App\Util;

use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

/**
 * Various utilities for working with the database.
 */
class DatabaseUtils
{
    /**
     * Returns an instance of the "Creator" role.
     *
     * It is created if not existent.
     */
    public static function getCreatorRole(): Role
    {
        return Role::firstOrCreate([
            'name' => 'Creator',
        ]);
    }

    /**
     * Create multiple permissions for an entity.
     *
     * @param array<string> $names
     */
    public static function createPermissions(string $entity, array $names): void
    {
        /** @var PermissionRegistrar */
        $registrar = app()->make(PermissionRegistrar::class);

        $registrar->forgetCachedPermissions();

        $role = self::getCreatorRole();

        foreach ($names as $name) {
            Permission::create([
                'name' => "{$entity}.{$name}"
            ]);
        }

        $role->givePermissionTo(Permission::all());

        $registrar->forgetCachedPermissions();
    }

    /**
     * Delete multiple permissions for an entity.
     *
     * @param array<string> $names
     */
    public static function deletePermissions(string $entity, array $names): void
    {
        /** @var PermissionRegistrar */
        $registrar = app()->make(PermissionRegistrar::class);

        $registrar->forgetCachedPermissions();

        $fqpn = collect($names)->map(fn ($name) => "{$entity}.{$name}");
        Permission::query()
            ->whereIn('name', $fqpn)
            ->delete();

        $registrar->forgetCachedPermissions();
    }
}
