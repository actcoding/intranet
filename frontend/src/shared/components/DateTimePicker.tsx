'use client'

import {Input} from '@/lib/components/common/Input'
import {DatePicker, DatePickerProps} from '@/shared/components/DatePicker'
import {useState} from 'react'

interface DateTimePickerProps extends DatePickerProps {
    selected?: Date;
    onDateTimeSelect?: (date: Date) => void;
    granularity?: 'day' | 'minute';
}

export const DateTimePicker = ({
    selected,
    onDateTimeSelect,
    granularity = 'minute',
    min,
    max,
}: DateTimePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(
        selected || new Date(),
    )

    const handleDateSelect = (date?: Date) => {
        if (!date) return
        const newDate = new Date(selectedDate)
        newDate.setDate(date.getDate())
        newDate.setMonth(date.getMonth())
        setSelectedDate(newDate)
        onDateTimeSelect?.(newDate)
    }

    const handleTimeSelect = (time?: string) => {
        if (!time) return
        const [hours, minutes] = time.split(':').map(Number)
        const newDate = new Date(selectedDate)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        setSelectedDate(newDate)
        onDateTimeSelect?.(newDate)
    }

    return (
        <div className="flex w-full gap-2">
            <DatePicker
                selected={selectedDate}
                onDaySelect={handleDateSelect}
                min={min}
                max={max}
            />
            {granularity === 'minute' ? (
                <Input
                    className="w-auto"
                    type={'time'}
                    value={selectedDate.toTimeString().slice(0, 5)}
                    onChange={(e) => handleTimeSelect(e.currentTarget.value)}
                />
            ) : null}
        </div>
    )
}
