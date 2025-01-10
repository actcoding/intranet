'use client'

import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'
import { mealFormSchema, MealFormValues } from '../components/ManageMeal/components/ManageMealForm/ManageMealForm.config'

interface MealFormProviderProps {
    children: ReactNode;
    onSubmit: (values: MealFormValues) => void;
    defaultValues?: MealFormValues
}

export const MealFormProvider = ({onSubmit, defaultValues, children}: MealFormProviderProps) => {
    const form = useForm<MealFormValues>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(mealFormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Form>
    )
}