import { newsApi } from "@/lib/api/api";
import CreateNewsForm from "@/lib/components/news/create-news-form/CreateNewsForm";

interface EditNewsPageProps {
    params: {
        id: number;
    };
}

const EditNewsPage = async (props: EditNewsPageProps) => {
    const news = await newsApi.newsShow({ id: props.params.id });
    return <CreateNewsForm news={news} />;
};
export default EditNewsPage;
