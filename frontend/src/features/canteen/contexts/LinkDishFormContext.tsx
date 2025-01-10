import {linkDishFormSchema} from '@/features/canteen/constants'
import {LinkDishFormValues} from '@/features/canteen/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface LinkDishFormProviderProps {
    children: ReactNode;
    onSubmit: (values: LinkDishFormValues) => void;
    defaultValues?: LinkDishFormValues
}

export const LinkDishFormProvider = ({onSubmit, defaultValues, children}: LinkDishFormProviderProps) => {
    const form = useForm<LinkDishFormValues>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(linkDishFormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Form>
    )
}
