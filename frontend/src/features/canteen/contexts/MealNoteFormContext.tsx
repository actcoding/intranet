'use client'

import {mealNoteFormSchema} from '@/features/canteen/constants'
import {MealNoteFormValues} from '@/features/canteen/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface CreateMealNoteFormProviderProps {
    children: ReactNode,
    onSubmit: (values: MealNoteFormValues) => void,
    defaultValues?: MealNoteFormValues,
}

const MealNoteFormProvider = ({children, onSubmit, defaultValues}: CreateMealNoteFormProviderProps) => {
    const form = useForm<MealNoteFormValues>({
        mode: 'onChange',
        resolver: zodResolver(mealNoteFormSchema),
        defaultValues,
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Form>
    )
}

export { MealNoteFormProvider }
