import Spinner from '@/lib/components/shared/Spinner'
import { cn } from '@/lib/utils'
import { forwardRef, Ref } from 'react'

interface LoadMoreNewsProps {
    className?: string;
}

const LoadMoreNews = forwardRef(
    (props: LoadMoreNewsProps, ref: Ref<HTMLDivElement>) => {
        return (
            <div
                className={cn('flex justify-center', props.className)}
                ref={ref}
            >
                <Spinner size={40} />
            </div>
        )
    },
)
LoadMoreNews.displayName = 'LoadMoreNews'
export default LoadMoreNews
