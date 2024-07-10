import NewsNewsForm from "@/lib/components/news/create-news-form/CreateNewsForm";

interface NewNewsPageProps {}

const NewNewsPage = (props: NewNewsPageProps) => {
    return (
        <div className="container">
            <NewsNewsForm />
        </div>
    );
};
export default NewNewsPage;
