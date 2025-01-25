import { getEventListAction } from '@/lib/actions/event'
import { EventResource } from '@/lib/api/generated'
import { addMonths, subMonths } from 'date-fns'
import { useEffect, useState } from 'react'

export function useMonthPicker() : [Date, EventResource[], () => void, () => void]{
    const [date, setDate] = useState<Date>(new Date())
    const [events, setEvents] = useState<EventResource[]>([])

    const goToPreviousMonth = () => {
        setDate(prevDate => subMonths(prevDate, 1))
    }

    const goToNextMonth = () => {
        setDate(prevDate => addMonths(prevDate, 1))
    }

    useEffect(() => {
        const getEvents = async () => {
            const month = date.getMonth() + 1
            const events = await getEventListAction({
                page: 1,
                perPage: 5,
                year: date.getFullYear(),
                month: month,
            })
            const orderedEvents = events.sort((a,b) => new Date(a.startingAt).getTime() - new Date(b.startingAt).getTime())
            setEvents(orderedEvents)
        }
        getEvents()
    }, [date])

    return [date,events , goToPreviousMonth, goToNextMonth]
}
