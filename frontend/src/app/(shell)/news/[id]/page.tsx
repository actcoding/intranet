import {NewsDetails} from '@/features/posts/components/NewsDetails/NewsDetails'
import {newsApi} from '@/lib/api/api'
import {AttachmentResource, NewsResource} from '@/lib/api/generated'

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
        <NewsDetails news={{...news, headerImage, attachments}} />
    )
}

export default SingleNewsPage
