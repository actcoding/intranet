import NewsList from "@/lib/components/news/news-list/NewsList";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import { Suspense } from "react";

interface Props {}
const NewsPage = async (props: Props) => {
    return (
        <Suspense fallback={<LoadMoreNews />}>
            <NewsList />
        </Suspense>
    );
};
export default NewsPage;
