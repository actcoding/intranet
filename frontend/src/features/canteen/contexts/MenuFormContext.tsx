'use client'

import {MenuFormValues} from '@/features/canteen/types'
import {Form} from '@/lib/components/common/Form'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface MenuFormProviderProps {
    children: ReactNode;
    onSubmit: (values: MenuFormValues) => void;
    defaultValues?: MenuFormValues
}

export const MenuFormProvider = ({onSubmit, defaultValues, children}: MenuFormProviderProps) => {
    const form = useForm<MenuFormValues>({
        mode: 'onChange',
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
