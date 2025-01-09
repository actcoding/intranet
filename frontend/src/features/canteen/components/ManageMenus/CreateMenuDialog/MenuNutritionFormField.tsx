import {useMenuForm} from '@/features/canteen/hooks'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/lib/components/common/Select'

export const MenuNutritionFormField = () => {
    const form = useMenuForm()

    return (
        <FormField
            control={form.control}
            name="nutrition"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Standardpreis</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Wähle eine Ernährungsform" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="omnivorous">Mit Fleisch</SelectItem>
                            <SelectItem value="vegetarian">Vegetarisch</SelectItem>
                            <SelectItem value="vegan">Vegan</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
