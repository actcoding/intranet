'use client'

import {useMenuForm} from '@/features/canteen/hooks'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Input} from '@/lib/components/common/Input'

export const MenuNameFormField = () => {
    const form = useMenuForm()
    
    return (
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
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
