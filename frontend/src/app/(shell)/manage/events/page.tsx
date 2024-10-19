import { Button } from '@/lib/components/common/Button'
import { DataTable } from '@/lib/components/common/DataTable'
import { pick } from 'lodash'
import { PlusIcon } from 'lucide-react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import Link from 'next/link'

interface Props {
    searchParams?: {
        page?: string;
    }
}

const ManageEventPage = async (props: Props) => {
    const currentPage = Number(props.searchParams?.page) || 1
    // TODO: Api einbinden
    // const eventList = []
    // const hasNextPage = eventList?.links.next
    // const total: number = eventList?.meta.total
    // const pageSize = eventList?.meta.perPage
    // const totalPages = Math.ceil(total / pageSize)
    const messages = await getMessages()
    const t = await getTranslations()

    return (<>
        <div className="mb-4 flex items-center justify-between">
            <h1 className="text-4xl font-semibold">
                {t('Index.news')}
            </h1>
            <Button asChild>
                <Link href="/manage/news/create">
                    <PlusIcon className="me-2" size={20} />
                    <span>
                        {t('News.create')}
                    </span>
                </Link>
            </Button>
        </div>
        <NextIntlClientProvider messages={pick(messages, ['Events'])}>
            <DataTable
                columns={columns}
                data={eventList.data}
                hasNextPage={hasNextPage}
                totalPages={totalPages}
            />
        </NextIntlClientProvider>
    </>)
}
