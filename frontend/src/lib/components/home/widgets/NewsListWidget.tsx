import { newsApi } from '@/lib/api/api'
import NewsPreviewCard from '@/lib/components/news/news-list/components/NewsPreviewCard'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface NewsListWidgetProps {
    className?: string;
}

const NewsListWidget = async (props: NewsListWidgetProps) => {
    const news = await newsApi.newsIndex({
        page: 1,
        perPage: 5,
        status: 'active',
    })
    if (news.data) {
        return (
            <div className={cn('flex flex-col gap-4 mb-3', props.className)}>
                {news.data.map((item, index) => (
                    <Link href={`/news/${item.id}`} key={index}>
                        <NewsPreviewCard news={item} headerImagePosition="left" />
                    </Link>
                ))}
            </div>
        )
    }
}
export default NewsListWidget
