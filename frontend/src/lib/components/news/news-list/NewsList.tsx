import { apiFetch } from "@/lib/api";
import NewsListContent from "@/lib/components/news/news-list/components/NewsListContent";
import { NextIntlClientProvider } from "next-intl";

interface NewsListProps {}

const NewsList = async (props: NewsListProps) => {
    const res = await apiFetch("/news?page=1&perPage=6");
    const news = await res.json();
    if (news.data) {
        return (
            <NextIntlClientProvider>
                <NewsListContent initialNews={news.data} />
            </NextIntlClientProvider>
        );
    }
};
export default NewsList;
