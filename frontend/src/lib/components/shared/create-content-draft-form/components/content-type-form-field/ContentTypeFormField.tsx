import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/lib/components/common/Form'
import { RadioGroup } from '@/lib/components/common/RadioGroup'
import { ContentTypeFormFieldItem } from '@/lib/components/shared/create-content-draft-form/components/content-type-form-field/components'
import { CreateDraftFormValues } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { CalendarIcon, NewspaperIcon } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

const ContentTypeFormField = () => {
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
                                <ContentTypeFormFieldItem
                                    value="news"
                                    id="news"
                                >
                                    <NewspaperIcon className="mb-3 size-6" />
                                    News
                                </ContentTypeFormFieldItem>
                                <ContentTypeFormFieldItem
                                    value="event"
                                    id="event"
                                >
                                    <CalendarIcon className="mb-3 size-6" />
                                    Event
                                </ContentTypeFormFieldItem>
                            </RadioGroup>
                        </FormControl>
                    </FormItem>
                )
            }}
        />
    )
}

export { ContentTypeFormField }
