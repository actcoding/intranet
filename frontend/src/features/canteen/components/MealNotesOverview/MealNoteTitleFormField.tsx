'use client'

import {useMealNoteForm} from '@/features/canteen/hooks'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Input} from '@/lib/components/common/Input'

export const MealNoteTitleFormField = () => {
    const form = useMealNoteForm()

    return (
        <FormField
            control={form.control}
            name="name"
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
