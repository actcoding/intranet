'use client'

import {useLinkDishForm} from '@/features/canteen/hooks'
import {DishResource, MenuResource} from '@/lib/api/generated'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {RadioGroup, RadioGroupItemCard} from '@/shared/components/RadioGroup'

interface EditLinkedDishesDialogFormFieldProps {
    menu: MenuResource;
    items: DishResource[];
}

const EditLinkedDishesDialogFormField = ({menu, items}: EditLinkedDishesDialogFormFieldProps) => {
    const form = useLinkDishForm()
    const alreadyLinked = menu.dishes ?? []
    const alreadyLinkedSet = new Set(alreadyLinked?.map((item) => item.id))

    return (
        <FormField
            control={form.control}
            name="dishId"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Gericht auswählen</FormLabel>
                    <FormMessage />
                    <FormControl>
                        <RadioGroup
                            className="flex flex-col gap-3"
                            onValueChange={field.onChange}
                            defaultValue={field.value?.toString()}
                        >
                            {items.map((item) => (
                                <RadioGroupItemCard id={item.id.toString()} key={item.id} value={item.id.toString()} disabled={alreadyLinkedSet.has(item.id)}>
                                    <p>{item.name}</p>
                                </RadioGroupItemCard>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </FormItem>
            )
            }
        />
    )
}

export { EditLinkedDishesDialogFormField }
