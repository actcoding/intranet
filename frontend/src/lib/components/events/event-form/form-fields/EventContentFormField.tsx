'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import Editor from '@/lib/components/news/create-news-form/components/news-form-fields/news-content-form-field/components/editor/Editor'
import { useFormContext } from 'react-hook-form'

interface EventContentFormField {
    label: string;
}

const EventContentFormField = (props: EventContentFormField) => {
    const form = useFormContext<EventFormValues>()
    return (
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">{props.label}</FormLabel>
                    <FormControl>
                        <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { EventContentFormField }
