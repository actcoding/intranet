'use client'

import {linkMenuFormSchema} from '@/features/canteen/constants'
import {LinkMenuFormValues} from '@/features/canteen/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface LinkMenuFormProviderProps {
    onSubmit: (values: LinkMenuFormValues) => void;
    children: ReactNode;
}

export const LinkMenuFormProvider = ({onSubmit, children}: LinkMenuFormProviderProps) => {
    const form = useForm<LinkMenuFormValues>({
        mode: 'onChange',
        resolver: zodResolver(linkMenuFormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Form>
    )
}
