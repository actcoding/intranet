<?php

namespace App\Http\Controllers;

use App\Models\Attachment;
use Dedoc\Scramble\Attributes\ExcludeAllRoutesFromDocs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

#[ExcludeAllRoutesFromDocs]
class StorageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $path)
    {
        $disk = Storage::disk('public');
        if (! $disk->exists($path)) {
            abort(404);
        }

        /** @var Attachment */
        $attachment = Attachment::query()
            ->where('path', $path)
            ->first();
        if ($attachment != null) {
            return $disk->download($path, $attachment->name);
        }

        return $disk->download($path);
    }
}
