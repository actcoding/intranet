import {EventDetailsHeaderMenu} from '@/features/posts/components/EventDetails'
import {EventPreviewTile} from '@/features/posts/components/EventPreviewTile'
import {Event} from '@/features/posts/types'
import {getAppSession} from '@/lib/actions/auth'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import {isCreator} from '@/lib/utils'

interface EventDetailsHeaderProps {
    event: Event;
}

const EventDetailsHeader = async ({event}: EventDetailsHeaderProps) => {
    const {sessionData} = await getAppSession()

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
            {isCreator(sessionData) ? (
                <div className="flex flex-1 justify-end">
                    <EventDetailsHeaderMenu event={event} />
                </div>
            ) : null}
        </div>
    )
}

export { EventDetailsHeader }
