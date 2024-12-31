import {NewsResource} from '@/lib/api/generated'
import NewsPreviewCard from '@/lib/components/news/news-list/components/NewsPreviewCard'
import {NewspaperIcon} from 'lucide-react'
import Link from 'next/link'

interface LinkedNewsProps {
    news: NewsResource[];
}

const LinkedNews = ({news}: LinkedNewsProps) => {
    return (
        <>
            <div className="mb-3 flex items-center gap-2">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <NewspaperIcon size={22} />
                </div>
                <h2 className="text-xl">Neuigkeiten</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {news.map((news) => (
                    <Link key={news.id} href={`/news/${news.id}`}>
                        <NewsPreviewCard news={news} headerImagePosition="left" />
                    </Link>
                ))}
            </div>
        </>
    )
}

export { LinkedNews }
