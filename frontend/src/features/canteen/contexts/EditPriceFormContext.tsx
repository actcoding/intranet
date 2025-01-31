import {editPriceFormSchema} from '@/features/canteen/constants'
import {EditPriceFormValues} from '@/features/canteen/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface EditPriceFormProviderProps {
    onSubmit: (values: EditPriceFormValues) => void;
    defaultValues: EditPriceFormValues;
    children: ReactNode;
}

export const EditPriceFormProvider = ({onSubmit, defaultValues, children}: EditPriceFormProviderProps) => {
    const form = useForm<EditPriceFormValues>({
        mode: 'onChange',
        defaultValues,
        resolver: zodResolver(editPriceFormSchema),
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {children}
            </form>
        </Form>
    )
}
