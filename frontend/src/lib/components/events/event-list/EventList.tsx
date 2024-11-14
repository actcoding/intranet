import { eventApi, newsApi } from '@/lib/api/api'
import { EntityStatus } from '@/lib/api/generated'
import EventListContent from '@/lib/components/events/event-list/components/EventListContent'
import NewsListContent from '@/lib/components/news/news-list/components/NewsListContent'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

type Props = {
    status?: EntityStatus
}

const EventList = async ({ status }: Props) => {
    const events = await eventApi.eventIndex({
        page: 1,
        perPage: 6,
        status,
    })
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={pick(messages, 'Event')}>
            <EventListContent initialEvents={events.data} perPage={6} />
        </NextIntlClientProvider>
    )
}
export default EventList
