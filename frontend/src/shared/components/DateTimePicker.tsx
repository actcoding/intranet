'use client'

import {Input} from '@/lib/components/common/Input'
import {DatePicker, DatePickerProps} from '@/shared/components/DatePicker'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/shared/components/Tooltip'
import {InfoIcon} from 'lucide-react'
import {useTimeZone} from 'next-intl'
import React, {useEffect, useState} from 'react'

interface DateTimePickerProps extends DatePickerProps {
    selected?: Date;
    onDateTimeSelect?: (date: Date) => void;
    granularity?: 'day' | 'minute';
}

export const DateTimePicker =  React.forwardRef<HTMLDivElement, DateTimePickerProps>(({
    selected: controlledSelectedDate,
    onDateTimeSelect,
    granularity = 'minute',
    min,
    max,
}: DateTimePickerProps, ref) => {
    const timeZone = useTimeZone()

    const [selectedDate, setSelectedDate] = useState<Date>(
        controlledSelectedDate ?? new Date(),
    )
    const isControlled = controlledSelectedDate !== undefined

    useEffect(() => {
        if (isControlled) setSelectedDate(controlledSelectedDate)
    }, [isControlled, controlledSelectedDate])

    const handleDateSelect = (date?: Date) => {
        if (!date) return
        const newDate = new Date(selectedDate)
        newDate.setFullYear(date.getFullYear())
        newDate.setDate(date.getDate())
        newDate.setMonth(date.getMonth())
        if(!isControlled) setSelectedDate(newDate)
        onDateTimeSelect?.(newDate)
    }

    const handleTimeSelect = (time?: string) => {
        if (!time) return
        const [hours, minutes] = time.split(':').map(Number)
        const newDate = new Date(selectedDate)
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        if(!isControlled) setSelectedDate(newDate)
        onDateTimeSelect?.(newDate)
    }

    return (
        <div className={'flex items-center gap-2'}>
            <div className="flex w-full gap-2" ref={ref}>
                <DatePicker
                    selected={selectedDate}
                    onDaySelect={handleDateSelect}
                    min={min}
                    max={max}
                    className={'flex-1'}
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
            <Tooltip>
                <TooltipTrigger type={'button'}><InfoIcon size={16} /></TooltipTrigger>
                <TooltipContent>Du bist in folgender Zeitzone: {timeZone}</TooltipContent>
            </Tooltip>
        </div>
    )
})

DateTimePicker.displayName = 'DateTimePicker'
