import { newsApi } from '@/lib/api/api'
import NewsListContent from '@/lib/components/news/news-list/components/NewsListContent'
import { NextIntlClientProvider } from 'next-intl'

const NewsList = async () => {
    const news = await newsApi.newsIndex({ page: 1, perPage: 6 })
    if (news.data) {
        return (
            <NextIntlClientProvider>
                <NewsListContent initialNews={news.data} />
            </NextIntlClientProvider>
        )
    }
}
export default NewsList
