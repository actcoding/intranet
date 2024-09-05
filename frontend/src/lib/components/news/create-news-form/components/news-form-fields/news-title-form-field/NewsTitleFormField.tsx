import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { CreateNewsForm } from '@/lib/components/news/create-news-form/CreateNewsForm.models'
import { CreateDraftNewsForm } from '../../../CreateNewsDraftForm'
import { Control } from 'react-hook-form'

interface NewsTitleFormFieldProps {
    form: CreateNewsForm | CreateDraftNewsForm;
}

const NewsTitleFormField = ({ form }: NewsTitleFormFieldProps) => {
    return (
        <FormField
            control={form.control as Control<any>}
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
