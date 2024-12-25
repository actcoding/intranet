import {NewsResource} from '@/lib/api/generated'
import {Card, CardContent, CardHeader, CardTitle} from '@/lib/components/common/Card'
import SanitizedHTMLContent from '@/lib/components/shared/SanitizedHTMLContent'
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
                        <Card className="flex flex-row overflow-hidden">
                            <div>
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{news.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    <SanitizedHTMLContent content={news.content} className="line-clamp-3" />
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </>
    )
}

export { LinkedNews }
