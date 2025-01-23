'use client'

import {EditPriceFormValues, LinkMenuFormValues} from '@/features/canteen/types'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Input} from '@/lib/components/common/Input'
import {useFormContext} from 'react-hook-form'

export const LinkMenuDialogMenuPriceFormField = () => {
    const form = useFormContext<LinkMenuFormValues | EditPriceFormValues>()
    return (
        <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Preis in €</FormLabel>
                    <FormControl>
                        <Input type="number" step={0.01} min={0} {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
