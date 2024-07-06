import NewsPostForm from "@/lib/components/posts/new-post-form/NewPostForm";

interface NewPostPageProps {}

const NewPostPage = (props: NewPostPageProps) => {
    return (
        <div className="container">
            <NewsPostForm />
        </div>
    );
};
export default NewPostPage;
