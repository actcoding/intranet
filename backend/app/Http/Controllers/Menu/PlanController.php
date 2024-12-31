<?php

namespace App\Http\Controllers\Menu;

use App\Http\Controllers\Controller;
use App\Http\Requests\Menu\MenuPlanRequest;
use App\Http\Requests\Menu\MenuServeRequest;
use App\Http\Requests\Menu\MenuUnserveRequest;
use App\Http\Resources\Menu\MenuPlanResource;
use App\Models\Menu\MenuPlan;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

/**
 * @tags Canteen
 */
class PlanController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['list']),
        ];
    }

    /**
     * Get served menus
     */
    public function list(MenuPlanRequest $request): AnonymousResourceCollection
    {
        $entries = MenuPlan::query()
            ->whereDate('served_at', '>=', $request->date('from'))
            ->whereDate('served_at', '<=', $request->date('to'))
            ->with(['menu.dishes'])
            ->get();

        return MenuPlanResource::collection($entries);
    }

    /**
     * Serve a menu
     */
    public function serve(MenuServeRequest $request): JsonResponse
    {
        $payload = $request->validated();

        /** @var int */
        $result = MenuPlan::upsert([
            $request->validated(),
        ], uniqueBy: ['served_at', 'menu_id'], update: ['price']);

        return response()->json(['changed' => $result]);
    }

    /**
     * Unserve a menu
     */
    public function unserve(MenuUnserveRequest $request): Response
    {
        $entity = MenuPlan::query()
            ->where('menu_id', $request->integer('menu_id'))
            ->whereDate('served_at', $request->date('served_at'))
            ->firstOrFail();

        $entity->delete();

        return response()->noContent();
    }
}
