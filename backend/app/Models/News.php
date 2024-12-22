<?php

namespace App\Models;

use App\Enum\EntityStatus;
use Database\Factories\NewsFactory;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
            $news->status = EntityStatus::DELETED;
            $news->published_at = null;
            $news->save();
        });

        static::restored(function (News $news) {
            $news->status = EntityStatus::DRAFT;
            $news->published_at = null;
            $news->save();
        });
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): NewsFactory
    {
        return NewsFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'published_at',
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
            'status' => EntityStatus::class,
        ];
    }

    protected function headerImage(): Attribute
    {
        return Attribute::make(
            get: fn (?string $value) => $value == null ? null : url(Storage::url($value)),
        );
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function isPublished(): bool
    {
        return $this->published_at != null;
    }

    public function isAuthor(User $user): bool
    {
        return $this->author_id === $user->id;
    }

    public function attachments(): MorphToMany
    {
        return $this->morphToMany(Attachment::class, 'attachable');
    }

    public function events(): BelongsToMany
    {
        $query = $this->belongsToMany(Event::class, 'event_news');

        if (Auth::guest()) {
            return $query->where('status', EntityStatus::ACTIVE);
        }

        return $query;
    }

    public function toArray(): array
    {
        return [
            'id' => $this->id,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'deleted_at' => $this->deleted_at,
            'published_at' => $this->published_at,

            'status' => $this->status,
            'title' => $this->title,
            'content' => $this->content,
            'header_image' => $this->header_image,
        ];
    }
}
