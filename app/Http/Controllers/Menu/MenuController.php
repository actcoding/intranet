<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Resources\Menu\MenuResource;
use App\Models\Menu\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class MenuController extends Controller
{
    /**
     * Speiseplan
     *
     * Zeigt eine Liste von Menüs auf dem Speiseplan an.
     *
     * @return AnonymousResourceCollection<MenuResource>
     */
    public function listMenus(Request $request)
    {
        $data = Menu::query()
            ->with(['meals', 'meals.ingredients'])
            ->get();

        return MenuResource::collection($data);
    }
}
