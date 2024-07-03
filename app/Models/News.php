<?php

namespace App\Models;

use App\Enum\NewsStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class News extends Model
{
    use HasFactory,
        SoftDeletes;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::deleted(function (News $news) {
            $news->status = NewsStatus::DELETED;
            $news->save();
        });

        static::restored(function (News $news) {
            $news->status = NewsStatus::DRAFT;
            $news->save();
        });
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'published_at',
        'author_id',
        'status',
        'title',
        'content',
        'header_image',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'deleted_at',
        'author_id',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => NewsStatus::class,
            'content' => 'array',
        ];
    }

    public function isPublished(): bool
    {
        return $this->published_at != null;
    }

    public function isAuthor(User $user): bool
    {
        return $this->author_id === $user->id;
    }
}
