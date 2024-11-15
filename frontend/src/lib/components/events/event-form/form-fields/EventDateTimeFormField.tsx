'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import { DateTimePicker } from '@/lib/components/shared/DateTimePicker'
import { useFormContext, useWatch } from 'react-hook-form'

interface EventDateTimeFormFieldProps {
    label: string;
    type: 'start' | 'end';
}

const EventDateTimeFormField = (props: EventDateTimeFormFieldProps) => {
    const form = useFormContext<EventFormValues>()
    const isAllDay = useWatch<EventFormValues>({ name: 'isAllDay' })

    return (
        <FormField
            control={form.control}
            name={`${props.type}ingAt`}
            render={({ field: { value, onChange, ...rest } }) => (
                <FormItem>
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <DateTimePicker
                            selected={value}
                            onDateTimeSelect={onChange}
                            granularity={isAllDay ? 'day' : 'minute'}
                            min={
                                props.type === 'end'
                                    ? form.watch('startingAt')
                                    : undefined
                            }
                            max={
                                props.type === 'start'
                                    ? form.watch('endingAt')
                                    : undefined
                            }
                            {...rest}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { EventDateTimeFormField }
