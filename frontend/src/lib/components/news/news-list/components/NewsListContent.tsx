"use client";

import { fetchNews } from "@/lib/actions/news";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import NewsPreviewCard from "@/lib/components/news/news-list/components/NewsPreviewCard";
import Link from "next/link";
import { motion } from "framer-motion";

import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface NewsListContentProps {
    initialNews: News[];
}

const NewsListContent = (props: NewsListContentProps) => {
    const [news, setNews] = useState<News[]>(props.initialNews);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const { isIntersecting, ref } = useIntersectionObserver();

    const loadMoreNews = useCallback(async () => {
        if (hasMoreData) {
            const newNews = await fetchNews(page + 1);
            if (newNews && newNews.length > 0) {
                setNews((prevNews) => [...prevNews, ...newNews]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMoreData(false);
            }
        }
    }, [hasMoreData, page]);

    useEffect(() => {
        if (isIntersecting) {
            loadMoreNews();
        }
    }, [isIntersecting, loadMoreNews]);

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-4">
                {news.map((news, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link href={`/news/${news.id}`}>
                            <NewsPreviewCard {...news} />
                        </Link>
                    </motion.div>
                ))}
            </div>
            {hasMoreData && <LoadMoreNews ref={ref} className="pb-60" />}
        </>
    );
};
export default NewsListContent;
