import {EventPreviewTile} from '@/features/posts/components/EventPreviewTile'
import {EventResource} from '@/lib/api/generated'
import {Card, CardContent, CardHeader, CardTitle} from '@/lib/components/common/Card'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import {CalendarIcon} from 'lucide-react'
import Link from 'next/link'

interface LinkedEventsProps {
    events: EventResource[];
}

const LinkedEvents = ({events}: LinkedEventsProps) => {
    return (
        <>
            <div className="mb-3 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <CalendarIcon size={22} />
                </div>
                <h2 className="text-xl">{`Verknüpfte ${events?.length === 1 ? 'Veranstaltung' : 'Veranstaltungen'}`}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {events.map((event) => (
                    <Link key={event.id} href={`/events/${event.id}`}>
                        <Card className="flex flex-row overflow-hidden">
                            <EventPreviewTile date={new Date(event.startingAt)}
                                className="w-[100px] shrink-0" />
                            <div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    <SanitizedHTMLContent content={event.content} className="line-clamp-3" />
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )

}

export { LinkedEvents }
