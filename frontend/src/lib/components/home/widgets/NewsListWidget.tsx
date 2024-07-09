import { fetchNews } from "@/lib/actions/news";
import NewsPreviewCard from "@/lib/components/news/news-list/components/NewsPreviewCard";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewsListWidgetProps {
    className?: string;
}

const NewsListWidget = async (props: NewsListWidgetProps) => {
    const news = await fetchNews(1, 5);
    return (
        <div className={cn("flex flex-col gap-4 mb-3", props.className)}>
            {news.map((newsItem, index) => (
                <Link href={`/news/${newsItem.id}`} key={index}>
                    <NewsPreviewCard headerImagePosition="left" {...newsItem} />
                </Link>
            ))}
        </div>
    );
};
export default NewsListWidget;
