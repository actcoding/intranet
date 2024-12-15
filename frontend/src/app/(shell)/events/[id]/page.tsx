import {EventDetails} from '@/features/posts/components/EventDetails'
import {eventApi} from '@/lib/api/api'
import {Alert, AlertTitle} from '@/lib/components/common/Alert'

interface EventDetailPageProps {
    params: {
        id: number
    }
}
const EventDetailPage = async ({params}: EventDetailPageProps) => {
    try {
        const event = await eventApi.eventShow({id: params.id})
        const attachments = await eventApi.eventUploadList({id: event.id, type: 'attachment'})
        return (
            <EventDetails event={{...event, attachments}} />
        )
    } catch (error) {
        console.error(error)
        return (
            <Alert variant="destructive">
                <AlertTitle>
                    Diese Veranstaltung konnte nicht gefunden werden.
                </AlertTitle>
            </Alert>)
    }
}

export default EventDetailPage
