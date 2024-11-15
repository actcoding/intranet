'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import { useFormContext } from 'react-hook-form'

interface EventTitleFormFieldProps {
    label: string;
}

const EventTitleFormField = (props: EventTitleFormFieldProps) => {
    const form = useFormContext<EventFormValues>()
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">{props.label}</FormLabel>
                    <FormControl>
                        <Input
                            placeholder="Titel eingeben..."
                            className="text-2xl font-bold"
                            variant="borderless"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { EventTitleFormField }
