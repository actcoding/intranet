'use client'

import { createEvent } from '@/features/posts/actions'
import { createDraftFormSchema } from '@/features/posts/constants'
import { CreateDraftFormValues } from '@/features/posts/types'
import { createNewsAction } from '@/lib/actions/news'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { endOfDay, startOfDay } from 'date-fns'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'

interface DraftFormProviderProps {
    children?: React.ReactNode;
    defaultValues?: Partial<CreateDraftFormValues>;
    onSuccess?: () => void;
}

const DraftFormProvider = ({
    children,
    defaultValues,
    onSuccess,
}: DraftFormProviderProps) => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<CreateDraftFormValues>({
        resolver: zodResolver(createDraftFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const handleSubmit = useCallback(
        async (values: CreateDraftFormValues) => {
            let response
            switch (values.type) {
                case 'news':
                    response = await createNewsAction({
                        title: values.title,
                        content: 'Hier könnte Ihre Neuigkeit stehen.',
                        status: 'draft',
                    })
                    break
                case 'event':
                    response = await createEvent({
                        title: values.title,
                        content: 'Hier könnte Ihre Eventbeschreibung stehen.',
                        startingAt: startOfDay(new Date()),
                        endingAt: endOfDay(new Date()),
                    })
                    break
                default:
                    toast({ title: 'Fehler', description: 'Ungültiger Typ' })
            }
            const { data, error } = response ?? {}

            if (error || !data) {
                toast({
                    title: 'Fehler',
                    description: error?.message as string,
                    variant: 'destructive',
                })
                return
            }

            toast({
                title: 'Entwurf erstellt',
                description:
                    'Der Entwurf wurde erstellt und kann jetzt vollumfänglich bearbeitet werden.',
            })

            onSuccess && onSuccess()
            switch (values.type) {
                case 'news':
                    router.push(`/manage/news/${data.id}`)
                    break
                case 'event':
                    router.push(`/manage/events/${data.id}`)
                    break
            }
        },
        [router, toast, onSuccess],
    )
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

export { DraftFormProvider }
