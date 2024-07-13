import { apiFetch } from "@/lib/api";
import NewsPreviewCard from "@/lib/components/news/news-list/components/NewsPreviewCard";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NewsListWidgetProps {
    className?: string;
}

const NewsListWidget = async (props: NewsListWidgetProps) => {
    const res = await apiFetch("/news?page=1&perPage=5");
    const news = await res.json();
    if (news.data) {
        return (
            <div className={cn("flex flex-col gap-4 mb-3", props.className)}>
                {news.data.map((item: News, index: number) => (
                    <Link href={`/news/${item.id}`} key={index}>
                        <NewsPreviewCard headerImagePosition="left" {...item} />
                    </Link>
                ))}
            </div>
        );
    }
};
export default NewsListWidget;
