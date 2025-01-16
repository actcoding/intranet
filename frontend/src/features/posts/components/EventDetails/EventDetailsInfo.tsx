import {eventDateTimeRangeConfig} from '@/features/posts/constants'
import {Event} from '@/features/posts/types'
import {Avatar, AvatarFallback} from '@/lib/components/common/Avatar'
import {Card, CardContent, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {CalendarIcon, UserIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'


interface EventDetailsInfoProps {
    event: Event;
}

const EventDetailsInfo = ({event}: EventDetailsInfoProps) => {
    const format = useFormatter()

    return (
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="grid justify-center gap-6 md:grid-cols-2">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="rounded-full bg-primary/15 p-3 text-primary">
                        <CalendarIcon size={32} />
                    </div>
                    <span>Zeitraum</span>
                    <span className="text-sm text-muted-foreground">
                        {format.dateTimeRange(Date.parse(event.startingAt), Date.parse(event.endingAt), eventDateTimeRangeConfig)}
                    </span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 p-4">
                    <div className="rounded-full bg-primary/15 p-3 text-primary">
                        <UserIcon size={32} />
                    </div>
                    <span>Organisator*in</span>
                    <div className="flex items-center gap-2">
                        <Avatar className="size-6">
                            <AvatarFallback className="text-xs">
                                {event.author.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{event.author.name}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export { EventDetailsInfo }
