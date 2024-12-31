import {EditEvent} from '@/features/posts/components/EditEvent'
import {eventApi} from '@/lib/api/api'

interface EditEventPageProps {
    params: {
        id: number;
    };
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
    const event = await eventApi.eventShow({ id: params.id })
    const files = await eventApi.eventUploadList({ id: params.id })
    const attachments = files.filter((file) => file.type === 'attachment')

    return (
        <EditEvent
            event={{
                ...event,
                attachments,
            }}
        />
    )
}

export default EditEventPage
