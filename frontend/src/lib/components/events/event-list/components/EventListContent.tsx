'use client'

import LoadMoreNews from '@/lib/components/news/news-list/components/LoadMoreNews'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { getNewsListAction } from '@/lib/actions/news'
import { EventResource} from '@/lib/api/generated'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'
import EventPreviewCard from '@/lib/components/events/event-list/components/EventPreviewCard'
import { getEventListAction } from '@/lib/actions/event'

interface EventListContentProps {
    initialEvents: EventResource[];
    perPage: number
}

const EventListContent = (props: EventListContentProps) => {
    const [events, setEvents] = useState<EventResource[]>(props.initialEvents)
    const [page, setPage] = useState(1)
    const [hasMoreData, setHasMoreData] = useState(true)
    const { isIntersecting, ref } = useIntersectionObserver()

    const loadMoreNews = useCallback(async () => {
        if (hasMoreData) {
            const events = await getEventListAction({
                page: page + 1,
                perPage: props.perPage,
            })
            if (events && events.length > 0) {
                setEvents((prevEvents) => [...prevEvents, ...events])
                setPage((prevPage) => prevPage + 1)
            } else {
                setHasMoreData(false)
            }
        }
    }, [hasMoreData, page, props.perPage])

    useEffect(() => {
        if (isIntersecting) {
            loadMoreNews()
        }
    }, [isIntersecting, loadMoreNews])

    if (events.length === 0) {
        return (
            <p>
                Es gibt noch keine Events.
            </p>
        )
    }

    return (<>
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {events.map((event, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href={`/events/${event.id}`}>
                        <EventPreviewCard event={event} className="h-full" />
                    </Link>
                </motion.div>
            ))}
        </div>
        {/* {hasMoreData ? <LoadMoreNews ref={ref} className="pb-60" /> : null} */}
    </>)
}
export default EventListContent
