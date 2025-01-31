'use client'

import {useLinkMenuForm} from '@/features/canteen/hooks'
import {MenuResource} from '@/lib/api/generated'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {RadioGroup, RadioGroupItemCard} from '@/shared/components/RadioGroup'

interface LinkMenuDialogMenuIdFormFieldProps {
    items: MenuResource[]
}

export const LinkMenuDialogMenuIdFormField = ({items}: LinkMenuDialogMenuIdFormFieldProps) => {
    const form = useLinkMenuForm()
    return (
        <FormField control={form.control} name="menuId" render={({field}) => (
            <FormItem>
                <FormLabel>Menü auswählen</FormLabel>
                <FormMessage />
                <FormControl>
                    <RadioGroup
                        className="flex flex-col gap-3"
                        onValueChange={field.onChange}
                        defaultValue={field.value?.toString()}
                    >
                        {items.map((item) => (
                            <RadioGroupItemCard id={item.id.toString()} key={item.id} value={item.id.toString()} onClick={() => form.setValue('price', item.defaultPrice ?? 0)}>
                                {item.name}
                            </RadioGroupItemCard>
                        ))}
                    </RadioGroup>
                </FormControl>
            </FormItem>
        )} />
    )
}
