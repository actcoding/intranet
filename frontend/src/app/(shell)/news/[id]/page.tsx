import { getAppSession } from '@/lib/actions/auth'
import { newsApi } from '@/lib/api/api'
import { Avatar, AvatarFallback } from '@/lib/components/common/Avatar'
import { Button } from '@/lib/components/common/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/lib/components/common/Dropdown'
import {
    DeleteNewsDropdownMenuItem,
    PublishNewsDropdownMenuItem,
} from '@/lib/components/manage/manage-news/manage-news-table/components'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
import { cn, isCreator } from '@/lib/utils'
import { MoreHorizontalIcon, PenIcon } from 'lucide-react'
import { getFormatter } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    params: {
        id: string;
    };
}

const SingleNewsPage = async (props: Props) => {
    const news = await newsApi.newsShow({ id: parseInt(props.params.id) })
    const format = await getFormatter()
    const attachments = await newsApi.newsUploadList({
        news: news.id,
        type: 'attachment',
    })
    const { sessionData } = await getAppSession()
    return (
        <>
            {isCreator(sessionData) && (
                <div className="flex w-full justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} size={'icon'}>
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <Link href={`/manage/news/${news.id}`}>
                                <DropdownMenuItem>
                                    <PenIcon size={16} className="mr-2" />
                                    Edit
                                </DropdownMenuItem>
                            </Link>
                            <PublishNewsDropdownMenuItem newsId={news.id}>
                                Veröffentlichen
                            </PublishNewsDropdownMenuItem>
                            <DeleteNewsDropdownMenuItem
                                newsId={news.id}
                                callbackUrl="/news"
                            >
                                Löschen
                            </DeleteNewsDropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
            <div className="mx-auto h-full max-w-[800px]">
                <div
                    className={cn(
                        'mb-6 rounded-lg overflow-hidden',
                        news.headerImage && 'h-[400px] relative',
                    )}
                >
                    {news.headerImage && (
                        <Image
                            src={news.headerImage}
                            alt={news.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                    <div
                        className={cn(
                            'flex flex-col gap-3 justify-end items-start',
                            news.headerImage &&
                                'bg-black bg-opacity-50 absolute inset-0 text-white p-6',
                        )}
                    >
                        {news.status === 'draft' && (
                            <NewsStatusBadge status={news.status} />
                        )}

                        <h1 className="mb-2 text-4xl font-bold">
                            {news.title}
                        </h1>

                        <div className="flex items-center gap-2">
                            <Avatar className="text-black">
                                <AvatarFallback>
                                    {news.author.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <span>{news.author.name}</span>
                            {news.publishedAt && (
                                <span className="opacity-70">
                                    {format.relativeTime(
                                        Date.parse(news.publishedAt),
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <SanitizedHTMLContent
                    content={news.content}
                    allowedTags={[
                        'p',
                        'strong',
                        'em',
                        'a',
                        'ul',
                        'ol',
                        'li',
                        'img',
                    ]}
                />
            </div>
            {/* {attachments.length > 0 && (
                <FileListPreview
                    files={[
                        attachments.map((attachment) => {
                            return attachment.data;
                        }),
                    ]}
                />
            )} */}
        </>
    )
}

export default SingleNewsPage
