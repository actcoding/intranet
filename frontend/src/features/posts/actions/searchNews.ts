import {newsApi} from '@/lib/api/api'

export const searchNews = async ({query}: {query: string}) => {
    const {data} = await newsApi.newsIndex()
    return data.filter((news) => news.title.toLowerCase().includes(query.toLowerCase()))
}
