import {CreateDraftDialog} from '@/features/posts/components/CreateDraftDialog'
import {newsApi} from '@/lib/api/api'
import {DataTable} from '@/lib/components/common/DataTable'
import {columns} from '@/lib/components/manage/manage-news/manage-news-table/ManageNewsTable.config'
import {pick} from 'lodash'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'

interface Props {
    searchParams?: {
        page?: string;
    };
}

const ManageNewsPage = async (props: Props) => {
    const currentPage = Number(props.searchParams?.page) || 1

    const newsList = await newsApi.newsIndex({
        page: currentPage,
        perPage: 10,
    })
    const hasNextPage = newsList?.links.next
    const total: number = newsList?.meta.total
    const pageSize = newsList?.meta.perPage
    const totalPages = Math.ceil(total / pageSize)
    const messages = await getMessages()
    const t = await getTranslations()

    return (
        <>
            <div className={'float-end'}>
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
            </div>
            <h1 className="mb-4 text-4xl font-semibold">{t('Index.news')}</h1>
            <NextIntlClientProvider messages={pick(messages, ['News'])}>
                <DataTable
                    columns={columns}
                    data={newsList.data}
                    hasNextPage={hasNextPage}
                    totalPages={totalPages}
                />
            </NextIntlClientProvider>
        </>
    )
}
export default ManageNewsPage
