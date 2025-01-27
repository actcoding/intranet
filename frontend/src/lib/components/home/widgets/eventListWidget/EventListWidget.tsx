'use client'

import {format} from 'date-fns'
import { Button } from '@/lib/components/common/Button'
import { Card, CardContent, CardFooter, CardHeader} from '@/lib/components/common/Card'
import EventWidgetCard from '@/lib/components/home/widgets/eventListWidget/components/EventWidgetCard'
import Link from 'next/link'
import { useMonthPicker } from '@/lib/components/hooks/use-month-picker'
import MonthPicker from '@/lib/components/event/event-list/components/MonthPicker'
import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/shared/components/ScrollArea'


const EventListWidget = () => {
    const [date, events, goToPreviousMonth, goToNextMonth] = useMonthPicker()
    const translate = useTranslations('Event')

    return (
        <Card className='w-full max-w-md flex-col justify-between'>
            <CardHeader>
                <MonthPicker
                    currentMonth={format(date, 'MMMM yyyy')}
                    goToPreviousMonth={goToPreviousMonth}
                    goToNextMonth={goToNextMonth}
                />
            </CardHeader>
            <CardContent>
                <ScrollArea className='h-72 w-full rounded-md'>
                    <div className='flex flex-col gap-2'>
                        {events.map((item, index) => (
                            <Link href={`/events/${item.id}`} key={index}>
                                <EventWidgetCard
                                    event={item}
                                />
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className='mt-auto'>
                <Button className='w-full' asChild>
                    <Link href="/events">{translate('overview')}</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default EventListWidget
