import { newsApi } from '@/lib/api/api'
import { NewsAttachmentsFormField } from '@/lib/components/news/create-news-form/components/news-form-fields'
import CreateNewsForm from '@/lib/components/news/create-news-form/CreateNewsForm'

interface EditNewsPageProps {
    params: {
        id: number;
    };
}

const EditNewsPage = async (props: EditNewsPageProps) => {
    const news = await newsApi.newsShow({ id: props.params.id })
    // return

    return (
        <div className="grid grid-cols-4 gap-x-6">
            <div className="col-span-3">
                <CreateNewsForm news={news} />
            </div>
            <NewsAttachmentsFormField news={news} />
        </div>
    )
}
export default EditNewsPage
