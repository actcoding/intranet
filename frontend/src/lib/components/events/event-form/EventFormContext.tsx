'use client'

import { updateEventAction } from '@/lib/actions/events'
import { EventResource } from '@/lib/api/generated'
import { Form } from '@/lib/components/common/Form'
import {
    eventFormSchema,
    EventFormValues,
} from '@/lib/components/events/event-form/EventForm.config'
import {
    buildUpdateEventRequest,
    eventIsAllDay,
} from '@/lib/components/events/event-form/EventForm.utils'
import { useToast } from '@/lib/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { endOfDay, startOfDay } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'

interface EventFormProps {
    event: EventResource;
    children?: React.ReactNode;
    className?: string;
}

const EventFormContext = (props: EventFormProps) => {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: props.event?.title ?? '',
            content: props.event?.content ?? '',
            startingAt:
                new Date(props.event.startingAt) ?? startOfDay(new Date()),
            endingAt: new Date(props.event.endingAt) ?? endOfDay(new Date()),
            isAllDay: eventIsAllDay(
                props.event.startingAt,
                props.event.endingAt,
            ),
        },
        mode: 'onChange',
    })

    // const router = useRouter();
    const { toast } = useToast()

    async function handleSubmit(values: EventFormValues) {
        try {
            await updateEventAction(
                buildUpdateEventRequest(props.event.id, values),
            )
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

export { EventFormContext }
