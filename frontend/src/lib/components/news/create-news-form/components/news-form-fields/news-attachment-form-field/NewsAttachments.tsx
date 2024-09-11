import { newsApi } from '@/lib/api/api'
import { News } from '@/lib/api/generated'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import NewsAttachmentsFormField from './NewsAttachmentsFormField'

interface NewsAttachmentsFormFieldProps {
    news: News
}

export async function NewsAttachments ({ news }: NewsAttachmentsFormFieldProps) {
    const files = await newsApi.newsUploadList({
        news: news.id,
        type: 'attachment',
    })

    return (
        <div className='space-y-4'>
            <p className="text-sm font-medium leading-none">
                Anhänge
            </p>

            <NewsAttachmentsFormField newsId={news.id} />

            <hr />

            <FileListPreview
                display='list'
                files={files.map(file => file.data)}
                download
            />
        </div>
    )
}
