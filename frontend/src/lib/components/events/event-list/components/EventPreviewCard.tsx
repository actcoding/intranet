import { EventResource } from '@/lib/api/generated'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/lib/components/common/Card'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { CalendarDaysIcon } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Image from 'next/image'

interface EventPreviewCardProps {
    event: EventResource
    headerImagePosition?: 'top' | 'left';
    className?: string;
}

const EventPreviewCard = ({
    headerImagePosition = 'top',
    className,
    event,
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
            <NewsPreviewCardHeaderImage
                src={event.attachments.find(a => a.type === 'header')?.data.url}
                alt={event.title || 'Event'}
                position={headerImagePosition}
            />
            <div className="flex grow flex-col">
                <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SanitizedHTMLContent
                        content={event.content}
                        className="line-clamp-3"
                    />
                </CardContent>
                <CardFooter className="mb-0 mt-auto">
                    {event.publishedAt ? (
                        <p className="text-muted-foreground">
                            {format.relativeTime(Date.parse(event.publishedAt))}
                        </p>
                    ) : (
                        <NewsStatusBadge status={event.status} />
                    )}
                </CardFooter>
            </div>
        </Card>
    )
}

interface NewsPreviewCardHeaderImageProps {
    src: string | undefined | null;
    alt: string;
    position?: 'top' | 'left';
}

const NewsPreviewCardHeaderImage = ({ src, alt, position }: NewsPreviewCardHeaderImageProps) => {
    const headerImageVariants = cva('relative shrink-0', {
        variants: {
            position: {
                top: 'h-[200px]',
                left: 'w-[200px]',
            },
        },
        defaultVariants: {
            position: 'top',
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
            <div
                className={cn(
                    headerImageVariants({ position }),
                    'bg-primary/15 flex items-center justify-center',
                )}
            >
                <CalendarDaysIcon className="text-primary" size={50} />
            </div>
        )
    }
}

export default EventPreviewCard
