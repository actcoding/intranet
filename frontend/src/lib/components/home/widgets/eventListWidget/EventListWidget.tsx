'use client'

import MonthSelector from '@/lib/components/home/widgets/eventListWidget/components/MonthSelector'
import { useEffect, useState } from 'react'
import {format, addMonths, subMonths} from 'date-fns'
import { getEventListAction } from '@/lib/actions/event'
import { EventResource } from '@/lib/api/generated'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/lib/components/common/Button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/common/Card'

interface EventListWidgetProps {
    className?: string;
    maxDisplay?: number
}

const EventListWidget = (props: EventListWidgetProps) => {
    const [date, setDate] = useState<Date>(new Date())
    const [events, setEvents] = useState<EventResource[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const goToPreviousMonth = () => {
        setDate(prevDate => subMonths(prevDate, 1))
    }

    const goToNextMonth = () => {
        setDate(prevDate => addMonths(prevDate, 1))
    }

    useEffect(() => {
        const getEvents = async () => {
            setIsLoading(true)

            // Adding artificial delay using a Promise
            // await new Promise((resolve) => setTimeout(resolve, 2000)) // 2-second delay

            const events = await getEventListAction({
                page: 1,
                perPage: 5,
            })
            setEvents(events)
            setIsLoading(false)
        }
        getEvents()
    }, [date])

    return (
        <Card className='w-full max-w-md flex-col justify-between'>
            <CardHeader>
                <MonthSelector 
                    currentMonth={format(date, 'MMMM yyyy')}
                    goToPreviousMonth={goToPreviousMonth}
                    goToNextMonth={goToNextMonth}
                />
            </CardHeader>
            <CardContent>
                <div className="min-h-[180px]">
                    <div>
                        {isLoading ? (
                            <p>Loading</p>
                        ): (
                            events.map((item, index) => (
                                <p key={index}>{item.title}</p>
                            ))
                        )}
                    </div>
                </div>
            </CardContent>
            <CardFooter className='mt-auto'>
                <Button className='w-full'>
                    <Ellipsis />
                </Button>
            </CardFooter>
        </Card>
    )
}

export default EventListWidget