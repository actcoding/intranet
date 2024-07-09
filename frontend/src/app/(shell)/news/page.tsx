import NewsList from "@/lib/components/news/news-list/NewsList";
import LoadMoreNews from "@/lib/components/news/news-list/components/LoadMoreNews";
import { Suspense } from "react";

interface Props {}
const NewsPage = async (props: Props) => {
    return (
        <>
            <h1 className="text-4xl font-semibold mb-4">News</h1>
            <Suspense fallback={<LoadMoreNews />}>
                <NewsList />
            </Suspense>
        </>
    );
};
export default NewsPage;
