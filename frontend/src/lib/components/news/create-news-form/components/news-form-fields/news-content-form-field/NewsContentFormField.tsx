'use client'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { CreateNewsForm } from '@/lib/components/news/create-news-form/CreateNewsForm.models'
import Editor from './components/editor/Editor'

interface NewsContentFormFieldProps {
    form: CreateNewsForm;
}

const NewsContentFormField = (props: NewsContentFormFieldProps) => {
    return (
        <FormField
            control={props.form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="sr-only">Content</FormLabel>
                    <FormControl>
                        <Editor {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
export { NewsContentFormField }
