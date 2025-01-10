import { Button } from '@/lib/components/common/Button'
import { format, getDay, setDay } from 'date-fns'
import { CalendarDays } from 'lucide-react'

interface DaySelectorProps {
    selectedDate: Date,
    onSelect: (date: Date) => void
}

const dayOptions = [
    { value: 1, label: 'Mo' },
    { value: 2, label: 'Di' },
    { value: 3, label: 'Mi' },
    { value: 4, label: 'Do' },
    { value: 5, label: 'Fr' },
]

const DaySelector = ({selectedDate, onSelect}: DaySelectorProps) => {
    const selectDay = (selectedWeekday: number) => {
        const updatedDate = setDay(selectedDate, selectedWeekday)
        onSelect(updatedDate)
    }
    
    return(
        <>
            <div className='flex flex-row justify-center gap-2'>
                <CalendarDays />
                <p>{format(selectedDate, 'dd.MM.yyyy')}</p>
            </div>
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
        </>
    )
}

export default DaySelector