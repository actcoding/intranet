'use client'

import {Button} from '@/lib/components/common/Button'
import {Popover, PopoverContent, PopoverTrigger} from '@/lib/components/common/Popover'
import {cn} from '@/lib/utils'
import {Calendar} from '@/shared/components/Calendar'
import {CalendarIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'
import {useEffect, useState} from 'react'

export interface DatePickerProps {
    selected?: Date;
    onDaySelect?: (date: Date) => void;
    min?: Date;
    max?: Date;
    className?: string;
}

export function DatePicker({
    selected: controlledSelectedDate,
    onDaySelect,
    min,
    max,
    className,
}: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(controlledSelectedDate ?? new Date())
    const isControlled = controlledSelectedDate !== undefined
    const formatter = useFormatter()

    useEffect(() => {
        if (isControlled) setDate(controlledSelectedDate)
    }, [isControlled, controlledSelectedDate])

    const handleSelect = (date?: Date) => {
        if (!date) return
        if(!isControlled) setDate(date)
        onDaySelect?.(date)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className,
                    )}
                >
                    <CalendarIcon className="mr-2 size-4" />
                    {date ? (
                        <span>
                            {formatter.dateTime(date, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    ) : (
                        <span>Wähle ein Datum</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    required={false}
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    disabled={min && max ? {before: min, after: max} : min ? {before: min} : max ? {after: max} : undefined}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
