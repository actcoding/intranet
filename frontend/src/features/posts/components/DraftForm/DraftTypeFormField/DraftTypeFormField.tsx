import { CreateDraftFormValues } from '@/features/posts/types'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/common/Form'
import { RadioGroup } from '@/shared/components/RadioGroup'
import { CalendarIcon, NewspaperIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { DraftTypeFormFieldItem } from '.'

const DraftTypeFormField = () => {
    const form = useFormContext<CreateDraftFormValues>()
    return (
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => {
                return (
                    <FormItem>
                        <FormLabel>Art des Inhalts</FormLabel>
                        <FormControl>
                            <RadioGroup
                                className="grid grid-cols-2 gap-4"
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <DraftTypeFormFieldItem value="news" id="news">
                                    <NewspaperIcon className="mb-3 size-6" />
                                    News
                                </DraftTypeFormFieldItem>
                                <DraftTypeFormFieldItem
                                    value="event"
                                    id="event"
                                >
                                    <CalendarIcon className="mb-3 size-6" />
                                    Event
                                </DraftTypeFormFieldItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}

export { DraftTypeFormField }
