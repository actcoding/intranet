'use client'

import { useMealForm } from '@/features/canteen/hooks/useMealForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'


export const MealNameFormField = () => {
    const form = useMealForm()

    return (
        <FormField
            control={form.control}
            name="name"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
