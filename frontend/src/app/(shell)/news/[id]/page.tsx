import {NewsDetails} from '@/features/posts/components/NewsDetails'
import {newsApi} from '@/lib/api/api'
import {AttachmentResource, NewsResource} from '@/lib/api/generated'
import {BackButton} from '@/shared/components/BackButton'

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

    return (
        <>
            <BackButton href={'/news'}>Zur Neuigkeiten-Übersicht</BackButton>
            <div className='mx-auto h-full max-w-[800px]'>
                <NewsDetails news={{...news, headerImage, attachments}} />
            </div>
        </>
    )
}

export default SingleNewsPage
