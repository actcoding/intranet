'use client'

import { Button } from '@/lib/components/common/Button'
import { addWeeks, format, setDay, startOfWeek, subWeeks } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

interface CanteenPlanSelectorProps {
    onDateChange: (date: Date) => void
}

const dayOptions = [
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
]

const CanteenPlanSelector = ({ onDateChange } : CanteenPlanSelectorProps) => {
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const weekStartsOn = 1 //start on Monday
    const [selectedWeekday, setSelectedWeekday] = useState<number>(1)

    useEffect(() => {
        onDateChange(currentDate)
    }, [currentDate, onDateChange])

    const goToPreviousWeek = () => {
        const updatedDate = subWeeks(currentDate, 1)
        setCurrentDate(updatedDate)
    }

    const goToNextWeek = () => {
        const updatedDate = addWeeks(currentDate, 1)
        setCurrentDate(updatedDate)
    }

    // weekdays from 0=Sunday to 6=Saturday
    const selectDay = (selectedWeekday: number) => {
        const updatedDate = setDay(currentDate, selectedWeekday)
        setSelectedWeekday(selectedWeekday)
        setCurrentDate(updatedDate)
    }

    return (
        <>
            {/* Week Selector */}
            <div className='flex items-center justify-between'>
                <Button variant='outline' onClick={goToPreviousWeek}>
                    <ChevronLeft />
                </Button>
                <p className='font-semibold'>{format(startOfWeek(currentDate, { weekStartsOn}), 'dd.MM.yyyy')}</p>
                <Button variant='outline' onClick={goToNextWeek}>
                    <ChevronRight />
                </Button>
            </div>
            {/* Day Selector */}
            <div className="flex flex-wrap justify-center gap-2">
                {dayOptions.map((day) => (
                    <Button
                        key={day.value}
                        onClick={() => selectDay(day.value)}
                        variant={selectedWeekday === day.value ? 'default' : 'outline'}
                        className="w-16"
                    >
                        {day.label}
                    </Button>
                ))}
            </div>
        </>
    )
}

export default CanteenPlanSelector