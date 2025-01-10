'use client'

import { useMealForm } from '@/features/canteen/hooks/useMealForm'
import { DishUpdateRequestTypeEnum } from '@/lib/api/generated'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/common/Form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/common/Select'


export const MealTypeFormField = () => {
    const form = useMealForm()

    return (
        <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Typ</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={field.value} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value={DishUpdateRequestTypeEnum.Main}>Hauptgericht</SelectItem>
                            <SelectItem value={DishUpdateRequestTypeEnum.Dessert}>Dessert</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
