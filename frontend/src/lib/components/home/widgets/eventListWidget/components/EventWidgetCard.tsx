import { EventResource } from '@/lib/api/generated'
import { Card, CardContent} from '@/lib/components/common/Card'
import { CalendarDays } from 'lucide-react'
import { useFormatter } from 'next-intl'

interface EventWidgetCardProps {
    event: EventResource
    className?: string
}

const EventWidgetCard = ({ event } : EventWidgetCardProps) => {
    const format = useFormatter()
    
    return (
        <Card className="w-full max-w-sm">
            <CardContent className="flex items-center justify-between p-4">
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-semibold" title={event.title}>
                        {event.title}
                    </h3>
                </div>
                <div className="ml-4 flex items-center text-sm text-muted-foreground">
                    <CalendarDays className="mr-1 size-4" aria-hidden="true" />
                    <time dateTime={event.startingAt}>
                        {format.dateTime(Date.parse(event.startingAt))}
                    </time>
                </div>
            </CardContent>
        </Card>
    )
}

export default EventWidgetCard