import { useState } from 'react'

interface PostListProps {
    initialPosts: Post[];
};

const PostList = (props: PostListProps) => {
    const [posts, setPosts] = useState<Post[]>(props.initialPosts);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
  return (
    {posts.map((post) => (<span>{post.title}</span>))}
  );
};
export default PostList;
