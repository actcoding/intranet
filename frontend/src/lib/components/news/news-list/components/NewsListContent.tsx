'use client'

import LoadMoreNews from '@/lib/components/news/news-list/components/LoadMoreNews'
import NewsPreviewCard from '@/lib/components/news/news-list/components/NewsPreviewCard'
import { motion } from 'framer-motion'
import Link from 'next/link'

import { getNewsListAction } from '@/lib/actions/news'
import { NewsResource } from '@/lib/api/generated'
import { useCallback, useEffect, useState } from 'react'
import { useIntersectionObserver } from 'usehooks-ts'

interface NewsListContentProps {
    initialNews: NewsResource[];
}

const NewsListContent = (props: NewsListContentProps) => {
    const [news, setNews] = useState<NewsResource[]>(props.initialNews)
    const [page, setPage] = useState(1)
    const [hasMoreData, setHasMoreData] = useState(true)
    const { isIntersecting, ref } = useIntersectionObserver()

    const loadMoreNews = useCallback(async () => {
        if (hasMoreData) {
            const news = await getNewsListAction({
                page: page + 1,
                perPage: 6,
            })
            if (news && news.length > 0) {
                setNews((prevNews) => [...prevNews, ...news])
                setPage((prevPage) => prevPage + 1)
            } else {
                setHasMoreData(false)
            }
        }
    }, [hasMoreData, page])

    useEffect(() => {
        if (isIntersecting) {
            loadMoreNews()
        }
    }, [isIntersecting, loadMoreNews])

    return (<>
        <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {news.map((news, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Link href={`/news/${news.id}`}>
                        <NewsPreviewCard news={news} className="h-full" />
                    </Link>
                </motion.div>
            ))}
        </div>
        {hasMoreData && <LoadMoreNews ref={ref} className="pb-60" />}
    </>)
}
export default NewsListContent
