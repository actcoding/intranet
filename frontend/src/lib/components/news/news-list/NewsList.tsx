import { fetchNews } from "@/lib/actions/news";
import NewsListContent from "@/lib/components/news/news-list/components/NewsListContent";
import { NextIntlClientProvider } from "next-intl";

interface NewsListProps {}

const NewsList = async (props: NewsListProps) => {
    const news = await fetchNews(1);
    return (
        <NextIntlClientProvider>
            <NewsListContent initialNews={news} />
        </NextIntlClientProvider>
    );
};
export default NewsList;
