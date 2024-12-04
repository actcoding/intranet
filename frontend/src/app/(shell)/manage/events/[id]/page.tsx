import { eventApi } from '@/lib/api/api'
import { EventForm } from '@/lib/components/events/event-form'

interface EditEventPageProps {
    params: {
        id: number;
    };
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
    const event = await eventApi.eventShow({ id: params.id })
    const { data } = await eventApi.eventUploadList({ id: params.id })
    const headerImage = data.filter((file) => file.type === 'header')[0]
    const attachments = data.filter((file) => file.type === 'attachment')

    return (
        <EventForm
            event={{
                ...event,
                headerImage,
                attachments,
            }}
        />
    )
}

export default EditEventPage
