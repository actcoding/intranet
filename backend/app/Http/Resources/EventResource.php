<?php

namespace App\Http\Resources;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var Event
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->resource->id,

            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
            'deleted_at' => $this->resource->deleted_at,
            'published_at' => $this->resource->published_at,

            'starting_at' => $this->resource->starting_at,
            'ending_at' => $this->resource->ending_at,

            'status' => $this->resource->status,
            'title' => $this->resource->title,
            'content' => $this->resource->content,

            'author' => [
                'name' => $this->resource->author->name,
            ],

            'attachments' => $this->whenLoaded('attachments', fn () => AttachmentResource::collection($this->resource->attachments)),
            'linked_news' => $this->whenLoaded('news', fn () => NewsResource::collection($this->resource->news)),
        ];
    }
}
