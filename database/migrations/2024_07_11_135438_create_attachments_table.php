<?php

use App\Models\Attachment;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();

            $table->text('name');
            $table->text('type');
            $table->text('path');
        });

        Schema::create('attachables', function (Blueprint $table) {
            $table->foreignIdFor(Attachment::class)->constrained()->cascadeOnDelete();
            $table->bigInteger('attachable_id');
            $table->string('attachable_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('attachables');
    }
};
