'use client'

import {EventFormValues} from '@/features/posts/types'
import {FormControl, FormField, FormItem, FormLabel} from '@/lib/components/common/Form'
import {Switch} from '@/shared/components/Switch'
import {endOfDay, startOfDay} from 'date-fns'
import {useFormContext} from 'react-hook-form'

interface EventIsAlldayFormFieldProps {
    label: string;
}

const EventIsAlldayFormField = (props: EventIsAlldayFormFieldProps) => {
    const form = useFormContext<EventFormValues>()
    const startingAt = form.watch('startingAt')
    const endingAt = form.watch('endingAt')

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
                            onCheckedChange={(checked) => {
                                onChange(checked)
                                if(checked) {
                                    form.setValue('startingAt', startOfDay(startingAt))
                                    form.setValue('endingAt', endOfDay(endingAt))
                                }
                            }}
                            {...rest}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    )
}

export { EventIsAlldayFormField }
