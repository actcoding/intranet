<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function list(Request $request)
    {
        return News::query()->paginate();
    }
}
