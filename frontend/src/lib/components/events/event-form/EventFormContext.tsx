'use client'

import { updateEventAction } from '@/lib/actions/events'
import { AttachmentResource, EventResource } from '@/lib/api/generated'
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
import React, { createContext, useContext } from 'react'
import { useForm } from 'react-hook-form'

interface EventContextProps {
    event: EventResource & {
        headerImage?: AttachmentResource;
        attachments?: AttachmentResource[];
    };
}

const EventContext = createContext<EventContextProps | undefined>(undefined)

export const useEvent = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error('useEvent must be used within an EventProvider')
    }
    return context
}

interface EventFormProps {
    event: EventResource & {
        headerImage?: AttachmentResource;
        attachments?: AttachmentResource[];
    };
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
        <EventContext.Provider value={{ event: props.event }}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="h-full"
                >
                    {props.children}
                </form>
            </Form>
        </EventContext.Provider>
    )
}

export { EventFormContext }
