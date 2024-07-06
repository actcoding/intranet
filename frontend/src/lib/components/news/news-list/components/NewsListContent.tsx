"use client";
import { fetchNews } from "@/lib/actions/news";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import NewsPreviewCard from "@/lib/components/news/news-list/components/NewsPreviewCard";

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
        <div className="flex flex-col gap-4">
            {news.map((news, index) => (
                <NewsPreviewCard key={index} {...news} />
            ))}
            {hasMoreData && <LoadMoreNews ref={ref} />}
        </div>
    );
};
export default NewsListContent;
