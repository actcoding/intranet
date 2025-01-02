'use client'

import { Button } from '@/lib/components/common/Button'
import { Card } from '@/lib/components/common/Card'
import { addWeeks, endOfWeek, format, getDay, isWithinInterval, setDay, startOfWeek, subWeeks } from 'date-fns'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

interface CanteenPlanSelectorProps {
    selectedDate: Date,
    onSelect: (date: Date) => void,
}

const dayOptions = [
    { value: 1, label: 'Mo' },
    { value: 2, label: 'Di' },
    { value: 3, label: 'Mi' },
    { value: 4, label: 'Do' },
    { value: 5, label: 'Fr' },
]

const CanteenPlanSelector = ({ selectedDate, onSelect } : CanteenPlanSelectorProps) => {
    const weekStartsOn = 1 

    const currentDate = new Date() 
  
    const startCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 }) 
    const endCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 })
  
    const startNextWeek = addWeeks(startCurrentWeek, 1)
    const endNextWeek = addWeeks(endCurrentWeek, 1)

    const isSameWeek = isWithinInterval(selectedDate, { start: startCurrentWeek, end: endCurrentWeek })
    const isNextWeek = isWithinInterval(selectedDate, { start: startNextWeek, end: endNextWeek })

    const startSelectedWeek = format(startOfWeek(selectedDate, { weekStartsOn }), 'dd.MM.yyyy')
    const endSelectedWeek = format(endOfWeek(selectedDate, { weekStartsOn }), 'dd.MM.yyyy')

    const goToPreviousWeek = () => {
        const updatedDate = subWeeks(selectedDate, 1)
        onSelect(updatedDate)
    }

    const goToNextWeek = () => {
        const updatedDate = addWeeks(selectedDate, 1)
        onSelect(updatedDate)
    }

    const selectDay = (selectedWeekday: number) => {
        const updatedDate = setDay(selectedDate, selectedWeekday)
        onSelect(updatedDate)
    }

    return (
        <div className="flex items-center justify-center">
            <Card className='w-full max-w-lg py-4 shadow-lg'>
                {/* Week Selector */}
                <div className='mb-4 flex items-center justify-center gap-6'>
                    <Button 
                        variant='ghost' 
                        onClick={goToPreviousWeek}
                        disabled={isSameWeek}
                    >
                        <ChevronLeft />
                    </Button>
                    <p className='font-semibold'>{startSelectedWeek + ' - ' + endSelectedWeek}</p>
                    <Button 
                        variant='ghost' 
                        onClick={goToNextWeek}
                        disabled={isNextWeek}
                    >
                        <ChevronRight />
                    </Button>
                </div>
                {/* Day Selector */}
                <div className="mb-2 flex flex-wrap justify-center gap-2">
                    {dayOptions.map((day) => (
                        <Button
                            key={day.value}
                            onClick={() => selectDay(day.value)}
                            variant={getDay(selectedDate) === day.value ? 'default' : 'outline'}
                            className="w-16"
                        >
                            {day.label}
                        </Button>
                    ))}
                </div>
                <div className='flex flex-row justify-center gap-2'>
                    <CalendarDays />
                    <p>{format(selectedDate, 'dd.MM.yyyy')}</p>
                </div>
            </Card>
        </div>
    )
}

export default CanteenPlanSelector