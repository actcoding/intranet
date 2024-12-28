'use client'

import {useMealNoteForm} from '@/features/canteen/hooks'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/lib/components/common/Select'

export const MealNoteTypeFormField = () => {
    const form = useMealNoteForm()

    return (
        <FormField
            control={form.control}
            name="type"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Typ</FormLabel>
                    <FormControl>
                        <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Typ wählen..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="allergen">Allergen</SelectItem>
                                <SelectItem value="additive">Zusatzstoff</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        >

        </FormField>
    )
}
