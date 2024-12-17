<?php

use App\Util\DatabaseUtils;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    private string $entity = 'news';

    private array $names = [
        'viewall',
        'create',
        'update',
        'delete',
        'restore',
        'forceDelete',
    ];

    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DatabaseUtils::createPermissions($this->entity, $this->names);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DatabaseUtils::deletePermissions($this->entity, $this->names);
    }
};
