"use client";
import { fetchPosts } from "@/lib/actions/posts";
import LoadMorePosts from "@/lib/components/posts/post-list/components/LoadMorePosts";
import PostPreviewCard from "@/lib/components/posts/post-list/components/PostPreviewCard";

import { useCallback, useEffect, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface Props {
    initialPosts: Post[];
}
const PostListContent = (props: Props) => {
    const [posts, setPosts] = useState<Post[]>(props.initialPosts);
    const [page, setPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const { isIntersecting, ref } = useIntersectionObserver();

    const loadMorePosts = useCallback(async () => {
        if (hasMoreData) {
            const newPosts = await fetchPosts(page + 1);
            if (newPosts && newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMoreData(false);
            }
        }
    }, [hasMoreData, page]);

    useEffect(() => {
        if (isIntersecting) {
            loadMorePosts();
        }
    }, [isIntersecting, loadMorePosts]);

    return (
        <div className="flex flex-col gap-4">
            {posts.map((post, index) => (
                <PostPreviewCard key={index} {...post} />
            ))}
            {hasMoreData && <LoadMorePosts ref={ref} />}
        </div>
    );
};
export default PostListContent;
