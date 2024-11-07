'use client'

import { Form } from '@/lib/components/common/Form'
import {
    eventFormSchema,
    EventFormValues,
} from '@/lib/components/events/event-form/EventForm.config'
import { useToast } from '@/lib/components/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { endOfDay, startOfDay } from 'date-fns'
import { useForm } from 'react-hook-form'

interface EventFormProps {
    event: any; // TODO: get type from OpenAPI
    className?: string;
    children?: React.ReactNode;
}

const EventForm = (props: EventFormProps) => {
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            title: props.event?.title ?? '',
            content: props.event?.content ?? '',
            starting_at: startOfDay(new Date()),
            ending_at: endOfDay(new Date()),
            isAllDay: true,
        },
        mode: 'onChange',
    })

    // const router = useRouter();
    const { toast } = useToast()

    async function handleSubmit(values: EventFormValues) {
        try {
            console.log(values)

            toast({
                title: 'Gespeichert',
            })
        } catch (error) {
            console.error('Event creation or file upload failed:', error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className={props.className}
            >
                {props.children}
            </form>
        </Form>
    )
}

export { EventForm }
