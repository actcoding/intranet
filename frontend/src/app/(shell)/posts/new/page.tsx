import NewsPostForm from "@/lib/components/news-post-form/NewsPostForm";

interface NewPostPageProps {}

const NewPostPage = (props: NewPostPageProps) => {
    return (
        <div className="container">
            <NewsPostForm />
        </div>
    );
};
export default NewPostPage;
