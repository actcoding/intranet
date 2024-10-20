import { getAppSession } from '@/lib/actions/auth'
import { newsApi } from '@/lib/api/api'
import { AttachmentResource, NewsResource } from '@/lib/api/generated'
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
import FileListPreview from '@/lib/components/shared/FileListPreview'
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
    const format = await getFormatter()

    let news: NewsResource|undefined
    let attachments: AttachmentResource[]|undefined

    try {
        // @ts-ignore
        news = await newsApi.newsShow({ id: parseInt(props.params.id) })
        attachments = await newsApi.newsUploadList({
            id: news.id,
        })
    } catch (error) {
        console.error(error)
    }

    const headerImage = attachments?.find(a => a.type === 'header')?.data

    if (news === undefined) {
        return (
            <p>
                404
            </p>
        )
    }

    const { sessionData } = await getAppSession()
    return (<>
        {isCreator(sessionData) ? (
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
        ) : null}
        <div className="mx-auto h-full max-w-[800px]">
            <div
                className={cn(
                    'mb-6 rounded-lg overflow-hidden',
                    headerImage && 'h-[400px] relative',
                )}
            >
                {headerImage === undefined ? null : (
                    <Image
                        src={headerImage?.url}
                        alt={news.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                )}
                <div
                    className={cn(
                        'flex flex-col gap-3 justify-end items-start',
                        headerImage &&
                                'bg-black bg-opacity-50 absolute inset-0 text-white p-6',
                    )}
                >
                    {news.status === 'draft' ? (
                        <NewsStatusBadge status={news.status} />
                    ) : null}

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
                        {news.publishedAt === null ? null : (
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
            <hr className="my-6" />
            {(attachments?.length ?? 0) > 0 ? (
                <FileListPreview
                    display='grid'
                    files={attachments?.filter(a => a.type === 'attachment').map(a => a.data) ?? []}
                    download
                />
            ) : null}
        </div>
    </>)
}

export default SingleNewsPage
