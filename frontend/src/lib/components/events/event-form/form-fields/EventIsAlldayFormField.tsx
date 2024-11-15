'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/common/Form'
import { Switch } from '@/lib/components/common/Switch'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import { useFormContext } from 'react-hook-form'

interface EventIsAlldayFormFieldProps {
    label: string;
}

const EventIsAlldayFormField = (props: EventIsAlldayFormFieldProps) => {
    const form = useFormContext<EventFormValues>()

    return (
        <FormField
            control={form.control}
            name="isAllDay"
            render={({ field: { value, onChange, ...rest } }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                    <FormLabel>{props.label}</FormLabel>
                    <FormControl>
                        <Switch
                            checked={value}
                            onCheckedChange={onChange}
                            {...rest}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export { EventIsAlldayFormField }
