import {LinkedEvents} from '@/features/posts/components/NewsDetails'
import {PostProvider} from '@/features/posts/contexts'
import {News} from '@/features/posts/types'
import {getAppSession} from '@/lib/actions/auth'
import {Avatar, AvatarFallback} from '@/lib/components/common/Avatar'
import {Button} from '@/lib/components/common/Button'
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
import {cn, isCreator} from '@/lib/utils'
import {MoreHorizontalIcon, PenIcon} from 'lucide-react'
import {getFormatter} from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'

interface NewsDetailsProps {
    news: News
}

const NewsDetails = async ({news}: NewsDetailsProps) => {
    const {sessionData} = await getAppSession()
    const format = await getFormatter()

    return (
        <>
            {isCreator(sessionData) ? (
                <div className="float-end">
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
            <div className='mx-auto h-full max-w-[800px]'>
                <PostProvider post={news}>
                    <div className="mx-auto h-full max-w-[800px]">
                        <div
                            className={cn(
                                'mb-6 rounded-lg overflow-hidden',
                                news.headerImage && 'h-[400px] relative',
                            )}
                        >
                            {news.headerImage === undefined ? null : (
                                <Image
                                    src={news.headerImage?.data.url}
                                    alt={news.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            )}
                            <div
                                className={cn(
                                    'flex flex-col gap-3 justify-end items-start',
                                    news.headerImage &&
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
                                            {format.relativeTime(news.publishedAt)}
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
                        {news.linkedEvents && news.linkedEvents?.length > 0 ? (
                            <>
                                <hr className="my-6" />
                                <LinkedEvents events={news.linkedEvents} />
                            </>
                        ) : null}
                        {(news.attachments?.length ?? 0) > 0 ? (
                            <>
                                <hr className="my-6" />
                                <FileListPreview
                                    display='grid'
                                    files={news.attachments?.map(a => a.data) ?? []}
                                    download /></>
                        ) : null}
                    </div>
                </PostProvider>
            </div>
        </>
    )
}

export {NewsDetails}
