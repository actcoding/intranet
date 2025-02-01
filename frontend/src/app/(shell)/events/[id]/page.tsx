import {EventDetails} from '@/features/posts/components/EventDetails'
import {eventApi} from '@/lib/api/api'
import {Alert, AlertTitle} from '@/lib/components/common/Alert'
import {BackButton} from '@/shared/components/BackButton'

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
            <>
                <BackButton href={'/events'}>Zur Veranstaltungen-Übersicht</BackButton>
                <div className='mx-auto h-full max-w-[800px]'>
                    <EventDetails event={{...event, attachments}} />
                </div>
            </>
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
