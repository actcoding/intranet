<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
