<?php

namespace App\Http\Resources;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var News
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

            'status' => $this->resource->status,
            'title' => $this->resource->title,
            'content' => $this->resource->content,

            'author' => [
                'name' => $this->resource->author->name,
            ],

            'attachments' => AttachmentResource::collection($this->resource->attachments),
        ];
    }
}
