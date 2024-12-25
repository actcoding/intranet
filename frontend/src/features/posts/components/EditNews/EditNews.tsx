import {EditLinkedEvents} from '@/features/posts/components/EditNews'
import {PostProvider} from '@/features/posts/contexts'
import {News} from '@/features/posts/types'
import {Button} from '@/lib/components/common/Button'
import {NewsAttachments} from '@/lib/components/news/create-news-form/components/news-form-fields'
import NewsHeaderImage
    from '@/lib/components/news/create-news-form/components/news-form-fields/news-header-image-form-field/NewsHeaderImage'
import CreateNewsForm from '@/lib/components/news/create-news-form/CreateNewsForm'

interface EditNewsProps {
    news: News
}
const EditNews = ({news}: EditNewsProps) => {
    return (
        <div className="grid grid-cols-4 gap-x-6">
            <PostProvider post={news}>
                <div className="col-span-3">
                    <div className="mb-4 flex items-center justify-between">
                        <p className='text-lg font-bold'>
                            Neuigkeit bearbeiten
                        </p>
                        {/* TODO: Hilfe */}
                        {/* <HelpCircleIcon /> */}
                        <Button form='create-news-form' type='submit' className='float-end'>Speichern</Button>
                    </div>
                    <CreateNewsForm news={news} />
                </div>

                <div className="space-y-4">
                    <div className="mb-4 flex items-center justify-between">
                        <p className='text-lg font-bold'>
                            Metadaten
                        </p>
                        {/* TODO: Hilfe */}
                        {/* <HelpCircleIcon /> */}
                    </div>
                    <NewsHeaderImage
                        id={news.id}
                        currentValue={news.headerImage}
                    />
                    <hr />
                    {news.attachments ? (
                        <NewsAttachments
                            id={news.id}
                            attachments={news.attachments}
                        />
                    ) : null}
                    <EditLinkedEvents />
                </div>
            </PostProvider>
        </div>
    )
}

export { EditNews }
