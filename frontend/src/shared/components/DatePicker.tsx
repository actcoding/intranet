'use client'

import {Button} from '@/lib/components/common/Button'
import {Popover, PopoverContent, PopoverTrigger} from '@/lib/components/common/Popover'
import {cn} from '@/lib/utils'
import {Calendar} from '@/shared/components/Calendar'
import {CalendarIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'
import {useState} from 'react'

export interface DatePickerProps {
    selected?: Date;
    onDaySelect?: (date: Date) => void;
    min?: Date;
    max?: Date;
    className?: string;
}

export function DatePicker({
    selected,
    onDaySelect,
    min,
    max,
    className,
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
                    disabled={{before: min, after: max}}
                    autoFocus
                />
            </PopoverContent>
        </Popover>
    )
}
