'use client'

import { DishResource, DishUpdateOperationRequest, DishUpdateRequestTypeEnum } from '@/lib/api/generated'
import { useForm } from 'react-hook-form'
import { mealFormSchema, MealFormValues } from './ManageMealForm.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/lib/components/common/Form'
import { Input } from '@/lib/components/common/Input'
import { Button } from '@/lib/components/common/Button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/lib/components/common/Select'
import { updateDishAction } from '@/lib/actions/canteen'
import { Textarea } from '@/lib/components/common/Textarea'


interface ManageMealFormProps {
    meal: DishResource
}

const ManageMealForm = ({meal}: ManageMealFormProps) => {
    const form = useForm<MealFormValues>({
        resolver: zodResolver(mealFormSchema),
        defaultValues: {
            name: meal.name,
            summary: meal.summary,
            type: meal.type as DishUpdateRequestTypeEnum,
        },
    })

    const onSubmit = async (values: MealFormValues) => {
        try { 
            await updateDishAction({
                dish: meal.id,
                dishUpdateRequest: {
                    name: values.name,
                    summary: values.summary,
                    type: values.type,
                },
            })
        } catch (error) {
            console.error('Dish update failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                <Button type="submit">
                    Speichern
                </Button>
            </form>
        </Form>
    )
}

export default ManageMealForm