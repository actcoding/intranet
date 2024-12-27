<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\GetWeekRequest;
use App\Http\Resources\Menu\MenuPlanResource;
use App\Http\Resources\Menu\MenuResource;
use App\Models\Menu\Menu;
use App\Models\Menu\MenuPlan;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Pagination\LengthAwarePaginator;

class MenuController extends Controller
{
    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<MenuResource>>
     */
    public function listMenus(Request $request)
    {
        $query = Menu::query()
            ->with(['meals', 'meals.ingredients']);

        return MenuResource::collection(
            $query->paginate($request->query('perPage', 10))
        );
    }

    /**
     * @return AnonymousResourceCollection<LengthAwarePaginator<MenuPlanResource>>
     */
    public function listPlans(Request $request)
    {
        $query = MenuPlan::query()
            ->with(['menu', 'menu.meals', 'menu.meals.ingredients']);

        return MenuPlanResource::collection(
            $query->paginate($request->query('perPage', 10))
        );
    }

    /**
     * @return AnonymousResourceCollection<MenuPlanResource>
     */
    public function listForWeek(GetWeekRequest $request)
    {
        $data = MenuPlan::query()
            ->whereDate('served_at', '>=', $request->date('starting_at'))
            ->whereDate('served_at', '<=', $request->date('ending_at'))
            ->with(['menu', 'menu.meals', 'menu.meals.ingredients'])
            ->get();

        return MenuPlanResource::collection($data);
    }
}
