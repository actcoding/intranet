import {NewsDetails} from '@/features/posts/components/NewsDetails'
import {newsApi} from '@/lib/api/api'
import {AttachmentResource, NewsResource} from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Props {
    params: {
        id: string;
    };
}

const SingleNewsPage = async (props: Props) => {
    let news: NewsResource|undefined
    let files: AttachmentResource[]|undefined

    try {
        // @ts-ignore
        news = await newsApi.newsShow({ id: parseInt(props.params.id) })
        files = await newsApi.newsUploadList({
            id: news.id,
        })
    } catch (error) {
        console.error(error)
    }

    const headerImage = files?.find(a => a.type === 'header')
    const attachments = files?.filter(a => a.type === 'attachment')

    if (news === undefined) {
        return (
            <p>
                404
            </p>
        )
    }

    return (<>
        <div className='mx-auto h-full max-w-[800px]'>
            <Button
                asChild
                size="sm"
                variant="link"
                className='mb-4'
            >
                <Link href="/news">
                    <ArrowLeft />
                    <span className="ml-1">
                        Zurück zu allen Neuigkeiten
                    </span>
                </Link>
            </Button>

            <NewsDetails news={{...news, headerImage, attachments}} />
        </div>
    </>)
}

export default SingleNewsPage
