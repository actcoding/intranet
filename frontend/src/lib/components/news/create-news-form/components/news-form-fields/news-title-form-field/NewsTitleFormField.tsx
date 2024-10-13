'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { CreateNewsForm } from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import { createDraftForm } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { useFormContext } from 'react-hook-form'

const NewsTitleFormField = () => {
    const form = useFormContext<CreateNewsForm | createDraftForm>()
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
