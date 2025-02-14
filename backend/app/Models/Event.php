<?php

namespace App\Models;

use App\Enum\EntityStatus;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use HasFactory,
        SoftDeletes;

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::deleted(function (Event $event) {
            $event->status = EntityStatus::DELETED;
            $event->published_at = null;
            $event->save();
        });

        static::restored(function (Event $event) {
            $event->status = EntityStatus::DRAFT;
            $event->published_at = null;
            $event->save();
        });
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): EventFactory
    {
        return EventFactory::new();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'published_at',
        'starting_at',
        'ending_at',
        'is_all_day',
        'status',
        'title',
        'content',
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
            'published_at' => 'datetime',
            'starting_at' => 'datetime',
            'ending_at' => 'datetime',
            'is_all_day' => 'boolean',
        ];
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

    public function news(): BelongsToMany
    {
        $query = $this->belongsToMany(News::class, 'event_news');

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

            'starting_at' => $this->starting_at,
            'ending_at' => $this->ending_at,
            'is_all_day' => $this->is_all_day,

            'title' => $this->title,
            'content' => $this->content,
        ];
    }
}
