'use client'

import {DishResource, DishUpdateRequestTypeEnum} from '@/lib/api/generated'
import {Button} from '@/lib/components/common/Button'
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/lib/components/common/Form'
import {Input} from '@/lib/components/common/Input'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/lib/components/common/Select'
import {Textarea} from '@/lib/components/common/Textarea'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {mealFormSchema, MealFormValues} from './ManageMealForm.config'


interface ManageMealFormProps {
    meal: DishResource
    handleSubmit: (meal: MealFormValues) => void
}

const ManageMealForm = ({meal, handleSubmit}: ManageMealFormProps) => {

    const form = useForm<MealFormValues>({
        resolver: zodResolver(mealFormSchema),
        defaultValues: {
            name: meal.name,
            summary: meal.summary,
            type: meal.type as DishUpdateRequestTypeEnum,
        },
    })

    const onSubmit = async (values: MealFormValues) => {
        handleSubmit(values)
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
                    Aktualisieren
                </Button>
            </form>
        </Form>
    )
}

export default ManageMealForm
