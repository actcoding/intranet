import { fetchPosts } from "@/lib/actions/posts";

interface Props {}
const PostsPage = async (props: Props) => {
    const posts = await fetchPosts(0);
    return <div>PostsPage</div>;
};
export default PostsPage;
