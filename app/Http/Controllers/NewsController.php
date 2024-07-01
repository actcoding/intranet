<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    /**
     * @LRDparam page integer|min:1
     * @LRDparam perPage integer|min:1|default:10
     */
    public function list(Request $request)
    {
        return News::query()->simplePaginate($request->query('perPage', 10));
    }
}
