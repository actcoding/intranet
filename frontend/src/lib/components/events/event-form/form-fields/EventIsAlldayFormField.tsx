'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/common/Form'
import { Switch } from '@/lib/components/common/Switch'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import { endOfDay, startOfDay } from 'date-fns'
import { useFormContext } from 'react-hook-form'

interface EventIsAlldayFormFieldProps {
    label: string;
}

const EventIsAlldayFormField = (props: EventIsAlldayFormFieldProps) => {
    const form = useFormContext<EventFormValues>()
    const startingAt = form.watch('starting_at')
    const endingAt = form.watch('ending_at')

    return (
        <FormField
            control={form.control}
            name="isAllDay"
            render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Switch
                            onCheckedChange={(checked) => {
                                onChange(checked)
                                startingAt &&
                                    checked &&
                                    form.setValue(
                                        'starting_at',
                                        startOfDay(startingAt),
                                    )
                                endingAt &&
                                    checked &&
                                    form.setValue(
                                        'ending_at',
                                        endOfDay(endingAt),
                                    )
                            }}
                            checked={value}
                            {...rest}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export { EventIsAlldayFormField }
