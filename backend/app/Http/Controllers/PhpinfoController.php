<?php

namespace App\Http\Controllers;

use Dedoc\Scramble\Attributes\ExcludeAllRoutesFromDocs;
use Illuminate\Http\Request;

#[ExcludeAllRoutesFromDocs]
class PhpinfoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        if (app()->isProduction()) {
            abort(404);
        }

        return view('phpinfo');
    }
}
