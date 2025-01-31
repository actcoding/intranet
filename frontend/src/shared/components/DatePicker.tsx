'use client'

import {Button} from '@/lib/components/common/Button'
import {Popover, PopoverContent, PopoverTrigger} from '@/lib/components/common/Popover'
import {cn} from '@/lib/utils'
import {Calendar} from '@/shared/components/Calendar'
import {isAfter, isBefore} from 'date-fns'
import {CalendarIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'
import {useState} from 'react'

export interface DatePickerProps {
    selected?: Date;
    onDaySelect?: (date: Date) => void;
    min?: Date;
    max?: Date;
}

export function DatePicker({
    selected,
    onDaySelect,
    min,
    max,
}: DatePickerProps) {
    const [date, setDate] = useState<Date | undefined>(selected || new Date())
    const formatter = useFormatter()

    const handleSelect = (date?: Date) => {
        if (!date) return
        setDate(date)
        onDaySelect?.(date)
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
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
                    disabled={(day) => {
                        const minWithoutTime = min && new Date(min).setHours(0, 0, 0, 0)
                        const maxWithoutTime = max && new Date(max).setHours(0, 0, 0, 0)
                        const dayWithoutTime = day.setHours(0, 0, 0, 0)
                        if (minWithoutTime && maxWithoutTime) return isBefore(dayWithoutTime, minWithoutTime) || isAfter(dayWithoutTime, maxWithoutTime)
                        if (minWithoutTime) return isBefore(dayWithoutTime, minWithoutTime)
                        if (maxWithoutTime) return isAfter(dayWithoutTime, maxWithoutTime)
                        return false
                    }}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
