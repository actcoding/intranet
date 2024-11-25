<?php

namespace App\Http\Controllers;

use App\Enum\EntityStatus;
use App\Http\Requests\Event\EventListRequest;
use App\Http\Requests\Event\EventStoreRequest;
use App\Http\Requests\Event\EventUpdateRequest;
use App\Http\Requests\Event\EventUploadImageRequest;
use App\Http\Resources\AttachmentResource;
use App\Http\Resources\EventResource;
use App\Http\Resources\UrlResource;
use App\Models\Attachment;
use App\Models\Event;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller implements HasMiddleware
{
    /**
     * Get the middleware that should be assigned to the controller.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:api', except: ['index', 'show', 'listAttachments']),
        ];
    }

    /**
     * Display a paginated list of Events.
     *
     * Guests and normal users will only see published events, while a Creator will receive
     * a list of all events.
     *
     * @return AnonymousResourceCollection<LengthAwarePaginator<EventResource>>
     */
    public function index(EventListRequest $request): AnonymousResourceCollection
    {
        $now = now();
        $year = $request->integer('year', $now->year);
        $month = $request->integer('month', $now->month);

        $query = Event::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->with('attachments')
            ->where(function (Builder $query) use ($year) {
                $query->whereYear('ending_at', $year)
                      ->orWhereYear('starting_at', $year);
            })
            ->where(function (Builder $query) use ($month) {
                $query->whereMonth('ending_at', $month)
                      ->orWhereMonth('starting_at', $month);
            });

        if (Gate::check('event.viewall')) {
            if ($request->has('status')) {
                $query = $query->whereStatus($request->input('status'));
            } else {
                $query = $query->withTrashed();
            }
        } else {
            $query = $query->whereStatus(EntityStatus::ACTIVE);
        }

        return EventResource::collection(
            $query->paginate($request->query('perPage', 10))
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventStoreRequest $request): JsonResponse
    {
        $event = new Event($request->validated());
        $event->author_id = auth()->user()->id;

        if ($event->status == EntityStatus::ACTIVE) {
            $event->published_at = now();
        }

        $event->save();
        $event->refresh();

        /**
         * `EventResource`
         *
         * @status 201
         *
         * @body EventResource
         */
        return (new EventResource($event))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * Guests and normal users will only see published events, while a Creator will receive
     * a list of all events.
     *
     * @param  int  $id  The event ID
     *
     * @unauthenticated
     */
    public function show($id): EventResource
    {
        $event = $this->find($id, allowGuest: true);

        $event->load('attachments');
        $event->load('author');

        return new EventResource($event);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int  $id  The event ID
     */
    public function update(EventUpdateRequest $request, $id): EventResource
    {
        $event = $this->find($id, 'update');

        if ($event->trashed()) {
            abort(403, 'You cannot update trashed events.');
        }

        $event->fill($request->validated());

        if ($event->status == EntityStatus::ACTIVE) {
            if ($event->published_at == null) {
                $event->published_at = now();
            }
        } else {
            $event->published_at = null;
        }

        $event->save();

        return new EventResource($event);
    }

    /**
     * Delete the specified resource from storage.
     *
     * @param  int  $id  The event ID
     */
    public function destroy(Request $request, $id): Response
    {
        $force = $request->boolean('force', false);

        $event = $this->find($id, $force ? 'forceDelete' : 'delete');

        if (! $force && $event->trashed()) {
            abort(403, 'You cannot delete trashed events.');
        }

        $force ? $event->forceDeleteQuietly() : $event->delete();

        return response()->noContent();
    }

    /**
     * Restore this resource from a deleted state.
     *
     * @param  int  $id  The event ID
     */
    public function restore($id): Response
    {
        $event = $this->find($id, 'restore');

        $event->restore();

        return response()->noContent();
    }

    /**
     * Attach a file to the specified resource.
     *
     * @param  int  $id  The event ID
     */
    public function upload(EventUploadImageRequest $request, $id): UrlResource
    {
        $event = $this->find($id, 'update');

        $type = $request->input('type');
        $file = $request->file('file');

        $path = $file->store('event/' . $id . '/' . $type, 'public');

        /** @var Attachment */
        $attachment = Attachment::create([
            'name' => $file->getClientOriginalName(),
            'type' => $file->getMimeType(),
            'path' => $path,
            'metadata' => [
                'type' => $type,
            ],
        ]);
        $attachment->attach($event);

        return new UrlResource($path);
    }

    /**
     * Delete an attachment from the specified resource.
     *
     * Deletes the specified attachment associated to the given Event entity.
     * If both are not related to each other or one is not found, a HTTP 404 error is
     * returned.
     *
     * @param  int  $id  The event ID
     */
    public function detach($id, Attachment $attachment): Response
    {
        $event = $this->find($id, 'delete');

        $belongs = $event->attachments()->where('id', $attachment->id)->exists();
        if (! $belongs) {
            abort(404, 'No attachment found!');
        }

        $attachment->detach($event);
        $attachment->delete();

        return response()->noContent();
    }

    /**
     * List all uploads of the specified resource.
     *
     * Returns a list of all files associated to a Event entity, including the upload types:
     * - content
     * - attachment
     *
     * @param  int  $id  The event ID
     * @return AnonymousResourceCollection<AttachmentResource>
     */
    public function listAttachments(Request $request, $id)
    {
        $event = $this->find($id, allowGuest: true);

        $query = collect(Validator::make($request->query(), [
            'type' => 'nullable|string|in:content,attachment',
        ])->validated());

        return AttachmentResource::collection($event->attachments);
    }

    private function find(string $id, ?string $action = null, bool $allowGuest = false): Event
    {
        $query = Event::query()
            ->where('id', $id);

        if (Gate::check('event.viewall')) {
            $query = $query->withTrashed();
        }

        $event = $query->firstOrFail();

        if (! $allowGuest) {
            Gate::authorize($action, $event);
        }

        return $event;
    }
}
