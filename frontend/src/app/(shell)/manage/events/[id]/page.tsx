import {EditEvent} from '@/features/posts/components/EditEvent'
import {eventApi} from '@/lib/api/api'
import { Button } from '@/lib/components/common/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface EditEventPageProps {
    params: {
        id: number;
    };
}

const EditEventPage = async ({ params }: EditEventPageProps) => {
    const event = await eventApi.eventShow({ id: params.id })
    const files = await eventApi.eventUploadList({ id: params.id })
    const attachments = files.filter((file) => file.type === 'attachment')

    return (<>
        <Button
            asChild
            size="sm"
            variant="link"
        >
            <Link href="/manage/events">
                <ArrowLeft />
                <span className="ml-1">
                    Zurück zu allen Veranstaltungen
                </span>
            </Link>
        </Button>
        <EditEvent
            event={{
                ...event,
                attachments,
            }}
        />
    </>)
}

export default EditEventPage
