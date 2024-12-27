<?php

namespace App\Http\Controllers;

use App\Http\Requests\Link\AttachRequest;
use App\Models\Link;
use Illuminate\Http\Response;

class LinkController extends Controller
{
    /**
     * Create an entity link
     *
     * Links two entities. This linking is purely informational and does not affect
     * any behavior.
     */
    public function attach(AttachRequest $request): Response
    {
        Link::create($request->validated());

        return response()->noContent();
    }

    /**
     * Delete an entity link
     *
     * Unlinks two previously linked entities.
     *
     * @param  int  $news  The ID of an attached News entity.
     * @param  int  $event  The ID of an attached Event entity.
     */
    public function detach(int $news, int $event): Response
    {
        $link = Link::query()
            ->where('news_id', $news)
            ->where('event_id', $event)
            ->firstOrFail();

        $link->delete();

        return response()->noContent();
    }
}
