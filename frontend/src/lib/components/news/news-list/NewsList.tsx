import { newsApi } from '@/lib/api/api'
import NewsListContent from '@/lib/components/news/news-list/components/NewsListContent'
import { pick } from 'lodash'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

const NewsList = async () => {
    const news = await newsApi.newsIndex({ page: 1, perPage: 6 })
    const messages = await getMessages()

    if (news.data) {
        return (
            <NextIntlClientProvider messages={pick(messages, 'News')}>
                <NewsListContent initialNews={news.data} />
            </NextIntlClientProvider>
        )
    }
}
export default NewsList
