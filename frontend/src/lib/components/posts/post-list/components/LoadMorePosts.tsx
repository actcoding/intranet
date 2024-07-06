import Spinner from "@/lib/components/shared/Spinner";
import { forwardRef, Ref } from "react";

interface LoadMorePostsProps {}
const LoadMorePosts = forwardRef(
    (props: LoadMorePostsProps, ref: Ref<HTMLDivElement>) => {
        return (
            <div className="flex justify-center mb-2" ref={ref}>
                <Spinner size={40} />
            </div>
        );
    }
);
LoadMorePosts.displayName = "LoadMorePosts";
export default LoadMorePosts;
