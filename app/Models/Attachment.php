<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class Attachment extends Model
{
    use HasFactory,
        SoftDeletes;

    protected static function booted(): void
    {
        static::forceDeleted(function (Attachment $attachment) {
            Storage::disk('public')->delete($attachment->getRawOriginal('path'));
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'type',
        'path',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'deleted_at',
        'pivot',
    ];

    protected function path(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value == null ? null : url(Storage::url($value)),
        );
    }

    public function attach(Model $model): void
    {
        DB::table('attachables')->insert([
            'attachment_id' => $this->id,
            'attachable_id' => $model->getKey(),
            'attachable_type' => get_class($model),
        ]);
    }

    public function detach(Model $model): void
    {
        DB::table('attachables')
            ->whereAll([
                'attachment_id' => $this->id,
                'attachable_id' => $model->getKey(),
                'attachable_type' => get_class($model),
            ])
            ->delete();
    }
}
