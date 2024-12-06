import { EventResource } from '@/lib/api/generated'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/lib/components/common/Card'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { CalendarDays } from 'lucide-react'
import { useFormatter } from 'next-intl'
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
                src={event.attachments.find(a => a.type === 'header')?.data.url}
                alt={event.title || 'Event'}
                position={headerImagePosition}
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
                        {cn(
                            format.dateTime(Date.parse(event.startingAt), {
                                dateStyle: 'full', 
                                timeStyle: 'short',
                            }),
                            ' - ',
                            format.dateTime(Date.parse(event.endingAt),{
                                dateStyle: 'full', 
                                timeStyle: 'short',
                            }),
                        )}
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
}

const EventPreviewCardImage = ({ src, alt, position }: EventPreviewCardImageProps) => {
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
            <div
                className={cn(
                    headerImageVariants({ position }),
                    'bg-primary/15 flex items-center justify-center',
                )}
            >
                <CalendarDays className="text-primary" size={50} />
            </div>
        )
    }
}


export default EventPreviewCard