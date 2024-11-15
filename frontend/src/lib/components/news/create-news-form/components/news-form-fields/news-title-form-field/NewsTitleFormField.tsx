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
import { useFormContext } from 'react-hook-form'

const NewsTitleFormField = () => {
    const form = useFormContext<CreateNewsFormValues>()
    return (
        <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">Titel</FormLabel>
                    <FormControl>
                        <Input
                            {...field}
                            placeholder="Titel eingeben..."
                            className="text-2xl font-bold"
                            variant="borderless"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
export { NewsTitleFormField }
