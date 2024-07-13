import CreateNewsForm from "@/lib/components/news/create-news-form/CreateNewsForm";

interface CreateNewsPagePageProps {}

const CreateNewsPage = (props: CreateNewsPagePageProps) => {
    return (
        <div className="container">
            <CreateNewsForm />
        </div>
    );
};
export default CreateNewsPage;
