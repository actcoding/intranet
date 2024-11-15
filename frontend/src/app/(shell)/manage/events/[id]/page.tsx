import { eventApi } from '@/lib/api/api'
import { EventForm } from '@/lib/components/events/event-form'

interface EditEventPageProps {
    params: {
        id: number;
    };
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
    const event = await eventApi.eventShow({ id: params.id })
    return <EventForm event={event} />
}

export default EditEventPage
