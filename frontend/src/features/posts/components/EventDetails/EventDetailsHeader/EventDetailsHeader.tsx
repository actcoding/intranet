import {EventDetailsHeaderMenu} from '@/features/posts/components/EventDetails'
import {Event} from '@/features/posts/types'
import {getAppSession} from '@/lib/actions/auth'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import {isCreator} from '@/lib/utils'
import {isThisYear} from 'date-fns'
import {getFormatter} from 'next-intl/server'

interface EventDetailsHeaderProps {
    event: Event;
}

const EventDetailsHeader = async ({event}: EventDetailsHeaderProps) => {
    const format = await getFormatter()
    const {sessionData} = await getAppSession()

    return (
        <div className="mb-6 flex flex-row gap-6">
            <div
                className="flex h-28 w-20 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                <span>{format.dateTime(Date.parse(event.startingAt), {month: 'short'})}</span>
                <span className="text-4xl font-bold">
                    {format.dateTime(Date.parse(event.startingAt), {day: 'numeric'})}
                </span>
                {isThisYear(Date.parse(event.startingAt)) ? null : (
                    <span>{format.dateTime(Date.parse(event.startingAt), {year: 'numeric'})}</span>)}
            </div>
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
