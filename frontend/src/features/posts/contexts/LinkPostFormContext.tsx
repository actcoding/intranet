'use client'

import {linkNewsAndEvent} from '@/features/posts/actions/linkNewsAndEvent'
import {linkPostFormSchema} from '@/features/posts/constants'
import {LinkPostFormValues, Post} from '@/features/posts/types'
import {Form} from '@/lib/components/common/Form'
import {zodResolver} from '@hookform/resolvers/zod'
import {useRouter} from 'next/navigation'
import {ReactNode} from 'react'
import {useForm} from 'react-hook-form'

interface LinkPostFormProviderProps {
    children?: ReactNode;
    post: Post;
    linkedPostType: 'news' | 'event'
    onSuccess?: () => void;
}

export const LinkPostFormProvider = ({children, post, linkedPostType, onSuccess}: LinkPostFormProviderProps) => {
    const router = useRouter()
    const form = useForm<LinkPostFormValues>({
        resolver: zodResolver(linkPostFormSchema),
        mode: 'onChange',
    })

    const handleSubmit = async (values: LinkPostFormValues) => {
        try {
            const newsId = Number(linkedPostType === 'news' ? values.postId : post.id )
            const eventId = Number(linkedPostType === 'event' ? values.postId : post.id)

            await linkNewsAndEvent({attachRequest: {newsId, eventId }})
            router.refresh()
            onSuccess?.()
        } catch (e) {
            console.error('Linking news and event failed:', e)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4"
            >
                {children}
            </form>
        </Form>
    )
}
