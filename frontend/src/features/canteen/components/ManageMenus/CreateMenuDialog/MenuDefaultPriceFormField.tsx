import {useMenuForm} from '@/features/canteen/hooks'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Input} from '@/lib/components/common/Input'

export const MenuDefaultPriceFormField = () => {
    const form = useMenuForm()

    return (
        <FormField
            control={form.control}
            name="defaultPrice"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Standardpreis</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
