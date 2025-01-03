import { newsApi } from '@/lib/api/api'
import { EntityStatus } from '@/lib/api/generated'
import NewsListContent from '@/lib/components/news/news-list/components/NewsListContent'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

type Props = {
    status?: EntityStatus
}

const NewsList = async ({ status }: Props) => {
    const news = await newsApi.newsIndex({
        page: 1,
        perPage: 6,
        status,
    })
    const messages = await getMessages()

    return (
        <NextIntlClientProvider messages={pick(messages, 'News')}>
            <NewsListContent initialNews={news.data} perPage={6} />
        </NextIntlClientProvider>
    )
}
export default NewsList
