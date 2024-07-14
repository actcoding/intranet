import { newsApi } from "@/lib/api/api";
import RenderedEditorContent from "@/lib/components/shared/RenderedEditorContent";

interface Props {
    params: {
        id: string;
    };
}
const SingleNewsPage = async (props: Props) => {
    const news = await newsApi.newsShow({ id: props.params.id });
    return (
        <div>
            <h1>{news.title}</h1>
            <RenderedEditorContent
                content={news.content}
                allowedTags={["p", "strong", "em", "a", "ul", "ol", "li"]}
            />
        </div>
    );
};
export default SingleNewsPage;
