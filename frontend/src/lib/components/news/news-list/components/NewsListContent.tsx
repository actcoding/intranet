"use client";
import { fetchNews } from "@/lib/actions/news";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import NewsPreviewCard from "@/lib/components/news/news-list/components/NewsPreviewCard";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface Props {
    initialNews: News[];
}
const NewsListContent = (props: Props) => {
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
                    <Link href={`/news/${news.id}`} key={index}>
                        <NewsPreviewCard {...news} />
                    </Link>
                ))}
            </div>
            {hasMoreData && <LoadMoreNews ref={ref} />}
        </>
    );
};
export default NewsListContent;
