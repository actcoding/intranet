'use client'

import {linkPostFormSchema} from '@/features/posts/constants'
import {LinkPostFormValues} from '@/features/posts/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface EditLinkedPostsFormProviderProps {
    children?: ReactNode;
    onSubmit?: (values: LinkPostFormValues) => void;
}

const EditLinkedPostsFormProvider = ({children, onSubmit}: EditLinkedPostsFormProviderProps) => {
    const form = useForm<LinkPostFormValues>({
        resolver: zodResolver(linkPostFormSchema),
        mode: 'onChange',
    })

    return (
        <Form {...form}>
            <form
                onSubmit={onSubmit && form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                {children}
            </form>
        </Form>
    )
}

export { EditLinkedPostsFormProvider }
