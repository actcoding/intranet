import {NewsResource} from '@/lib/api/generated'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import {cn} from '@/lib/utils'
import {cva} from 'class-variance-authority'
import {useFormatter} from 'next-intl'
import Image from 'next/image'

interface NewsPreviewCardProps {
    news: NewsResource
    headerImagePosition?: 'top' | 'left';
    className?: string;
}

const NewsPreviewCard = ({
    headerImagePosition = 'top',
    className,
    news,
}: NewsPreviewCardProps) => {
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
                src={news.attachments?.find(a => a.type === 'header')?.data.url}
                alt={news.title || 'News'}
                position={headerImagePosition}
            />
            <div className="flex grow flex-col">
                <CardHeader>
                    <CardTitle>{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <SanitizedHTMLContent
                        content={news.content}
                        className="line-clamp-3"
                    />
                </CardContent>
                <CardFooter className="mb-0 mt-auto">
                    {news.publishedAt ? (
                        <p className="text-muted-foreground">
                            {format.relativeTime(news.publishedAt)}
                        </p>
                    ) : (
                        <NewsStatusBadge status={news.status} />
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
                <Image src={'/newspaper.png'} className={'mb-2'} height={70} width={70} alt=""/>
            </div>
        )
    }
}

export default NewsPreviewCard
