import {EventPreviewTile} from '@/features/posts/components/EventPreviewTile'
import {Event} from '@/features/posts/types'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'

interface EventDetailsHeaderProps {
    event: Event;
}

const EventDetailsHeader = async ({event}: EventDetailsHeaderProps) => {
    return (
        <div className="mb-6 flex flex-row gap-6">
            <EventPreviewTile date={new Date(event.startingAt)} className="h-28 w-20 shrink-0 rounded-lg" />
            <div className="flex flex-col items-start justify-center gap-3">
                {event.status !== 'active' ? (
                    <NewsStatusBadge status={event.status} />
                ) : null}

                <div className="text-4xl font-bold">
                    {event.title}
                </div>
            </div>
        </div>
    )
}

export { EventDetailsHeader }
