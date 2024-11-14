'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { CreateNewsFormValues } from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import { CreateDraftFormValues } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { useFormContext } from 'react-hook-form'

const NewsTitleFormField = () => {
    const form = useFormContext<CreateNewsFormValues | CreateDraftFormValues>()
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Titel</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
export { NewsTitleFormField }
