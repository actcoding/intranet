'use client'

import { updateEvent } from '@/features/posts/actions'
import { eventFormSchema } from '@/features/posts/constants'
import { Event, EventFormValues } from '@/features/posts/types'
import { buildUpdateEventRequest } from '@/features/posts/utils'
import { Form } from '@/lib/components/common/Form'
import { useToast } from '@/lib/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { endOfDay, startOfDay } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'

interface EventFormProviderProps {
    event: Event;
    children?: React.ReactNode;
    className?: string;
}

const EventFormProvider = (props: EventFormProviderProps) => {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: props.event?.title ?? '',
            content: props.event?.content ?? '',
            startingAt:
                new Date(props.event.startingAt) ?? startOfDay(new Date()),
            endingAt: new Date(props.event.endingAt) ?? endOfDay(new Date()),
            isAllDay: props.event.isAllDay,
        },
        mode: 'onChange',
    })

    // const router = useRouter();
    const { toast } = useToast()

    async function handleSubmit(values: EventFormValues) {
        try {
            await updateEvent(buildUpdateEventRequest(props.event.id, values))
            toast({
                title: 'Gespeichert',
            })
        } catch (error) {
            console.error('Event creation or file upload failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="h-full">
                {props.children}
            </form>
        </Form>
    )
}

export { EventFormProvider }
