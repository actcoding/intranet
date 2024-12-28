<?php

use App\Util\DatabaseUtils;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    private string $entityMain = 'menu';

    private array $entitySub = [
        'ingredient',
        'dish',
        'menu',
        'plan',
    ];

    private array $names = [
        'viewall',
        'create',
        'update',
        'delete',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        foreach ($this->entitySub as $subEntity) {
            $entity = $this->entityMain . '.' . $subEntity;
            DatabaseUtils::createPermissions($entity, $this->names);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        foreach ($this->entitySub as $subEntity) {
            $entity = $this->entityMain . '.' . $subEntity;
            DatabaseUtils::deletePermissions($entity, $this->names);
        }
    }
};
