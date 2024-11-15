import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { CreateDraftFormValues } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.model'
import { useFormContext } from 'react-hook-form'

export const DraftTitleFormField = () => {
    const form = useFormContext<CreateDraftFormValues>()
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
