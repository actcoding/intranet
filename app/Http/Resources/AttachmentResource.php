<?php

namespace App\Http\Resources;

use App\Enum\UploadType;
use App\Models\Attachment;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttachmentResource extends JsonResource
{
    /**
     * The resource instance.
     *
     * @var Attachment
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
            /** @var UploadType */
            'type' => $this->resource->metadata['type'],
            'data' => [
                'id' => $this->resource->id,
                'name' => $this->resource->name,
                'type' => $this->resource->type,
                'url' => $this->resource->path,
            ],
            'uploader' => $this->whenLoaded('uploader', fn() => $this->resource->uploader),
        ];
    }
}
