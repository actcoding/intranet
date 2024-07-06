import { fetchNews } from "@/lib/actions/news";
import NewsListContent from "@/lib/components/news/news-list/components/NewsListContent";

interface NewsListProps {}

const NewsList = async (props: NewsListProps) => {
    const news = await fetchNews(1);
    return <NewsListContent initialNews={news} />;
};
export default NewsList;
