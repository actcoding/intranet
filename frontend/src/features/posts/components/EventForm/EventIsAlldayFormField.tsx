'use client'

import { EventFormValues } from '@/features/posts/types'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/common/Form'
import { Switch } from '@/shared/components/Switch'
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
