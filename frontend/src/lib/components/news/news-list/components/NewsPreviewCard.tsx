import { News } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/lib/components/common/Card'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import { cn } from '@/lib/utils'
import { cva } from 'class-variance-authority'
import { NewspaperIcon } from 'lucide-react'
import { useFormatter } from 'next-intl'
import Image from 'next/image'

interface NewsPreviewCardProps extends News {
    headerImagePosition?: 'top' | 'left';
    className?: string;
}

const NewsPreviewCard = ({
    headerImagePosition = 'top',
    ...props
}: NewsPreviewCardProps) => {
    const format = useFormatter()

    return (
        <Card
            className={cn(
                'flex',
                headerImagePosition === 'top' && 'flex-col',
                'overflow-hidden',
                props.className,
            )}
        >
            <NewsPreviewCardHeaderImage
                src={props.headerImage}
                alt={props.title || 'News'}
                position={headerImagePosition}
            />
            <div className="flex grow flex-col">
                <CardHeader>
                    <CardTitle>{props.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SanitizedHTMLContent
                        content={props.content}
                        className="line-clamp-3"
                    />
                </CardContent>
                <CardFooter className="mb-0 mt-auto">
                    {props.publishedAt ? (
                        <p className="text-muted-foreground">
                            {format.relativeTime(Date.parse(props.publishedAt))}
                        </p>
                    ) : (
                        <Badge variant={'secondary'}>Entwurf</Badge>
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

const NewsPreviewCardHeaderImage = (props: NewsPreviewCardHeaderImageProps) => {
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

    if (props.src) {
        return (
            <div className={headerImageVariants({ position: props.position })}>
                <Image
                    src={props.src}
                    alt={props.alt}
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>
        )
    } else {
        return (
            <div
                className={cn(
                    headerImageVariants({ position: props.position }),
                    'bg-primary/15 flex items-center justify-center',
                )}
            >
                <NewspaperIcon className="text-primary" size={50} />
            </div>
        )
    }
}

export default NewsPreviewCard
