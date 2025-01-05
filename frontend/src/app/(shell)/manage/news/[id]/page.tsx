import {EditNews} from '@/features/posts/components/EditNews'
import {newsApi} from '@/lib/api/api'

interface EditNewsPageProps {
    params: {
        id: number;
    };
}

const EditNewsPage = async (props: EditNewsPageProps) => {
    const news = await newsApi.newsShow({ id: props.params.id })
    const files = await newsApi.newsUploadList({ id: props.params.id })
    const headerImage = files.find((file) => file.type === 'header')
    const attachments = files.filter((file) => file.type === 'attachment')

    return (
        <EditNews news={{...news, headerImage, attachments}} />
    )
}
export default EditNewsPage
