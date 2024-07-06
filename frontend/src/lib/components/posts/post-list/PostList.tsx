import { fetchPosts } from "@/lib/actions/posts";
import PostListContent from "@/lib/components/posts/post-list/components/PostListContent";

interface PostListProps {}

const PostList = async (props: PostListProps) => {
    const posts = await fetchPosts(1);
    return <PostListContent initialPosts={posts} />;
};
export default PostList;
