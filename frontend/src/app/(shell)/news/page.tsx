import {CreateDraftDialog} from '@/features/posts/components/CreateDraftDialog'
import {getAppSession} from '@/lib/actions/auth'
import {Button} from '@/lib/components/common/Button'
import LoadMoreNews from '@/lib/components/news/news-list/components/LoadMoreNews'
import NewsList from '@/lib/components/news/news-list/NewsList'
import {Settings2Icon} from 'lucide-react'
import {getTranslations} from 'next-intl/server'
import Link from 'next/link'
import {Suspense} from 'react'

const NewsPage = async () => {
    const { sessionData } = await getAppSession()
    const t = await getTranslations()

    return (
        <>
            {sessionData?.roles.includes('Creator') ? (
                <div className="float-end space-x-2">
                    <CreateDraftDialog
                        triggerButtonProps={{
                            triggerButtonVariant: 'default',
                            triggerButtonLabel: t('News.create'),
                        }}
                        formProps={{
                            defaultContentType: 'news',
                            showContentTypePicker: false,
                        }}
                    />
                    <Button asChild variant={'secondary'}>
                        <Link href="/manage/news">
                            <Settings2Icon className="me-2" size={20} />
                            {t('News.manage')}
                        </Link>
                    </Button>
                </div>
            ) : null}
            <div className="flex justify-between">
                <h1 className="mb-4 text-4xl font-semibold">
                    {t('Index.news')}
                </h1>
            </div>
            <Suspense fallback={<LoadMoreNews />}>
                <NewsList status="active" />
            </Suspense>
        </>
    )
}
export default NewsPage
