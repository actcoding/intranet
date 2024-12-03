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
            const events = await getEventListAction({
                page: 1,
                perPage: 5,
            })
            setEvents(events)
        }
        getEvents()
    }, [date])

    return [date,events , goToPreviousMonth, goToNextMonth]
}