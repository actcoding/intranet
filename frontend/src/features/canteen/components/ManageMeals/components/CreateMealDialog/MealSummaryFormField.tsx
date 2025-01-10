'use client'

import { useMealForm } from '@/features/canteen/hooks/useMealForm'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/common/Form'
import { Textarea } from '@/lib/components/common/Textarea'


export const MealSummaryFormField = () => {
    const form = useMealForm()

    return (
        <FormField
            control={form.control}
            name="summary"
            render={({field}) => (
                <FormItem>
                    <FormLabel>Beschreibung</FormLabel>
                    <FormControl>
                        <Textarea 
                            className="resize-none"
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
