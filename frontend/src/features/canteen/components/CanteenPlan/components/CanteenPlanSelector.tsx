'use client'

import { Button } from '@/lib/components/common/Button'
import { Card } from '@/lib/components/common/Card'
import { addWeeks, endOfWeek, format, getDay, setDay, startOfWeek, subWeeks } from 'date-fns'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

interface CanteenPlanSelectorProps {
    selected: Date,
    onSelect: (date: Date) => void,
}

const dayOptions = [
    { value: 1, label: 'Mo' },
    { value: 2, label: 'Di' },
    { value: 3, label: 'Mi' },
    { value: 4, label: 'Do' },
    { value: 5, label: 'Fr' },
]

const CanteenPlanSelector = ({ selected, onSelect } : CanteenPlanSelectorProps) => {
    const weekStartsOn = 1 //start on Monday

    const goToPreviousWeek = () => {
        const updatedDate = subWeeks(selected, 1)
        onSelect(updatedDate)
    }

    const goToNextWeek = () => {
        const updatedDate = addWeeks(selected, 1)
        onSelect(updatedDate)
    }

    // weekdays from 0=Sunday to 6=Saturday
    const selectDay = (selectedWeekday: number) => {
        const updatedDate = setDay(selected, selectedWeekday)
        onSelect(updatedDate)
    }

    return (
        <div className="flex items-center justify-center">
            <Card className='w-full max-w-lg py-4 shadow-lg'>
                {/* Week Selector */}
                <div className='mb-4 flex items-center justify-center gap-6'>
                    <Button variant='outline' onClick={goToPreviousWeek}>
                        <ChevronLeft />
                    </Button>
                    <p className='font-semibold'>{format(startOfWeek(selected, { weekStartsOn }), 'dd.MM.yyyy') + ' - ' + format(endOfWeek(selected, { weekStartsOn }), 'dd.MM.yyyy')}</p>
                    <Button variant='outline' onClick={goToNextWeek}>
                        <ChevronRight />
                    </Button>
                </div>
                {/* Day Selector */}
                <div className="mb-2 flex flex-wrap justify-center gap-2">
                    {dayOptions.map((day) => (
                        <Button
                            key={day.value}
                            onClick={() => selectDay(day.value)}
                            variant={getDay(selected) === day.value ? 'default' : 'outline'}
                            className="w-16"
                        >
                            {day.label}
                        </Button>
                    ))}
                </div>
                <div className='flex flex-row justify-center gap-2'>
                    <Calendar />
                    <p>{format(selected, 'dd.MM.yyyy')}</p>
                </div>
            </Card>
        </div>
    )
}

export default CanteenPlanSelector