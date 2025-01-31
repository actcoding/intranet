import {EventPreviewTile} from '@/features/posts/components/EventPreviewTile'
import {eventDateTimeRangeConfig} from '@/features/posts/constants'
import {EventResource} from '@/lib/api/generated'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import {cn} from '@/lib/utils'
import {cva} from 'class-variance-authority'
import {CalendarDays} from 'lucide-react'
import {useFormatter} from 'next-intl'
import Image from 'next/image'

interface EventPreviewCardProps {
    event: EventResource
    className?: string;
    headerImagePosition?: 'top' | 'left';
}

const EventPreviewCard = ({
    className,
    event,
    headerImagePosition = 'left',
}: EventPreviewCardProps) => {
    const format = useFormatter()

    return (
        <Card
            className={cn(
                'flex',
                headerImagePosition === 'top' && 'flex-col',
                'overflow-hidden',
                className,
            )}
        >
            <EventPreviewCardImage
                src={event.attachments?.find(a => a.type === 'header')?.data.url}
                alt={event.title || 'Event'}
                position={headerImagePosition}
                date={new Date(event.startingAt)}
            />
            <div className='flex grow flex-col'>
                <CardHeader>
                    <CardTitle>{event?.title}</CardTitle>
                </CardHeader>
                <CardContent className='overflow-hidden'>
                    <SanitizedHTMLContent
                        content={event.content}
                        className="line-clamp-3"
                    />

                </CardContent>
                <CardFooter className="mb-0 mt-auto">
                    <CalendarDays className="mr-1 size-4" aria-hidden="true" />
                    <time className="text-muted-foreground">
                        {format.dateTimeRange(event.startingAt, event.endingAt, eventDateTimeRangeConfig)}
                    </time>
                </CardFooter>
            </div>
        </Card>
    )
}

interface EventPreviewCardImageProps {
    src: string | undefined | null;
    alt: string;
    position?: 'top' | 'left'
    date: Date;
}

const EventPreviewCardImage = ({ src, alt, position, date }: EventPreviewCardImageProps) => {
    const headerImageVariants = cva('relative shrink-0', {
        variants: {
            position: {
                top: 'h-[200px]',
                left: 'w-[200px]',
            },
        },
        defaultVariants: {
            position: 'left',
        },
    })

    if (src) {
        return (
            <div className={headerImageVariants({ position })}>
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
        )
    } else {
        return (
            <EventPreviewTile date={date} className={cn(
                headerImageVariants({ position }),
                'bg-primary/15 flex items-center justify-center',
            )} />
        )
    }
}


export default EventPreviewCard
