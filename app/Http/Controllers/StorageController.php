<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $path)
    {
        $disk = Storage::disk('public');

        if (!$disk->exists($path)) {
            abort(404);
        }

        return $disk->response($path);
    }
}
