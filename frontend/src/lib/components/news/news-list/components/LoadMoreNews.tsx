import Spinner from "@/lib/components/shared/Spinner";
import { forwardRef, Ref } from "react";

interface LoadMoreNewsProps {}
const LoadMoreNews = forwardRef(
    (props: LoadMoreNewsProps, ref: Ref<HTMLDivElement>) => {
        return (
            <div className="flex justify-center mb-2" ref={ref}>
                <Spinner size={40} />
            </div>
        );
    }
);
LoadMoreNews.displayName = "LoadMoreNews";
export default LoadMoreNews;
