import PostList from "@/lib/components/posts/post-list/PostList";
import LoadMorePosts from "@/lib/components/posts/post-list/components/LoadMorePosts";
import { Suspense } from "react";

interface Props {}
const PostsPage = async (props: Props) => {
    return (
        <Suspense fallback={<LoadMorePosts />}>
            <PostList />
        </Suspense>
    );
};
export default PostsPage;
