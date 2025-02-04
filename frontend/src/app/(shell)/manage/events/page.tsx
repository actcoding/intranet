import {CreateDraftDialog} from '@/features/posts/components/CreateDraftDialog'
import {eventApi} from '@/lib/api/api'
import {DataTable} from '@/lib/components/common/DataTable'
import {columns} from '@/lib/components/manage/manage-events/manage-events-table/ManageEventsTable.config'
import {pick} from 'lodash'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'

interface Props {
    searchParams?: {
        page?: string;
    };
}

const ManageEventPage = async (props: Props) => {
    const currentPage = Number(props.searchParams?.page) || 1
    const eventList = await eventApi.eventIndex({
        page: currentPage,
        perPage: 10,
    })
    const hasNextPage = eventList?.links.next
    const total: number = eventList?.meta.total
    const pageSize = eventList?.meta.perPage
    const totalPages = Math.ceil(total / pageSize)
    const messages = await getMessages()
    const t = await getTranslations()

    return (
        <>
            <div className={'float-end'}>
                <CreateDraftDialog
                    triggerButtonProps={{
                        triggerButtonVariant: 'default',
                        triggerButtonLabel: t('Event.create'),
                    }}
                    formProps={{
                        defaultContentType: 'event',
                        showContentTypePicker: false,
                    }} />
            </div>
            <h1 className="text-4xl font-semibold">{t('Index.events')}</h1>
            <NextIntlClientProvider messages={pick(messages, ['Event'])}>
                <DataTable
                    columns={columns}
                    data={eventList.data}
                    hasNextPage={hasNextPage}
                    totalPages={totalPages}
                />
            </NextIntlClientProvider>
        </>
    )
}

export default ManageEventPage
