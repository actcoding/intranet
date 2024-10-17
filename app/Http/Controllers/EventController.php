<?php

namespace App\Http\Controllers;

use App\Http\Requests\Event\EventListRequest;
use App\Http\Requests\Event\EventStoreRequest;
use App\Http\Requests\Event\EventUpdateRequest;
use App\Http\Requests\Event\UploadImageRequest;
use App\Http\Resources\AttachmentResource;
use App\Http\Resources\EventResource;
use App\Models\Attachment;
use App\Models\Event;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
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
        $query = Event::query()
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->with('attachments');

        if (Gate::check('event.viewall')) {
            $query = $query->withTrashed();
        } else {
            $query = $query->whereNotNull('published_at');
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
        Gate::authorize('create', Event::class);

        $event = new Event($request->validated());
        $event->author_id = auth()->user()->id;

        $event->save();
        $event->refresh();

        return response()->json($event, 201);
    }

    /**
     * Display the specified resource.
     *
     * Guests and normal users will only see published events, while a Creator will receive
     * a list of all events.
     *
     * @param  int  $id
     *
     * @unauthenticated
     *
     * @response EventResource
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
     * @param  int  $id
     */
    public function update(EventUpdateRequest $request, $id): JsonResponse
    {
        $event = $this->find($id, 'update');

        if ($event->trashed()) {
            abort(403, 'You cannot update trashed events.');
        }

        $event->fill($request->validated());
        $event->save();

        return response()->json($event);
    }

    /**
     * Delete the specified resource from storage.
     *
     * @param  int  $id
     */
    public function destroy(Request $request, $id): Response
    {
        $force = $request->boolean('force', false);

        $event = $this->find($id, $force ? 'forceDelete' : 'delete');

        if ($event->trashed()) {
            abort(403, 'You cannot delete trashed events.');
        }

        $force ? $event->forceDeleteQuietly() : $event->delete();

        return response()->noContent();
    }

    /**
     * Restore this resource from a deleted state.
     *
     * @param  int  $id
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
     * @param  int  $id
     */
    public function upload(UploadImageRequest $request, $id): JsonResponse
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

        return response()->json(['url' => url(Storage::url($path))]);
    }

    /**
     * Delete an attachment from the specified resource.
     *
     * Deletes the specified attachment associated to the given Event entity.
     * If both are not related to each other or one is not found, a HTTP 404 error is
     * returned.
     */
    public function detach(Event $event, Attachment $attachment): Response
    {
        $belongs = $event->attachments()->where('id', $attachment->id)->exists();
        if (! $belongs) {
            abort(404, 'No matching attachment could be found!');
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
     * @param  int  $id
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
