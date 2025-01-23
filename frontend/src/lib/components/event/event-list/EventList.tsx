'use client'

import EventPreviewCard from '@/lib/components/event/event-list/components/EventPreviewCard'
import MonthPicker from '@/lib/components/event/event-list/components/MonthPicker'
import {useMonthPicker} from '@/lib/components/hooks/use-month-picker'
import {cn} from '@/lib/utils'
import {SlideUpAnimation} from '@/shared/components/SlideUpAnimation'
import {format} from 'date-fns'
import Link from 'next/link'

interface Props {
    className?: string;
}

const EventList = (props: Props) => {
    const [date, events, goToPreviousMonth, goToNextMonth] = useMonthPicker()

    return (<>
        <div className='pv mx-auto my-4 w-1/3'>
            <MonthPicker
                currentMonth={format(date, 'MMMM yyyy')}
                goToPreviousMonth={goToPreviousMonth}
                goToNextMonth={goToNextMonth}
            />
        </div>
        <div className={cn('flex flex-col gap-4 mb-3', props.className)}>
            {events.map((item, index) => (
                <SlideUpAnimation key={index}>
                    <Link href={`/events/${item.id}`}>
                        <EventPreviewCard event={item} className='h-full'/>
                    </Link>
                </SlideUpAnimation>
            ))}
        </div>
    </>)
}

export default EventList
