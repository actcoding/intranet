import Spinner from '@/lib/components/shared/Spinner'
import { cn } from '@/lib/utils'

interface LoadMenuProps {
    className?: string;
}

const LoadMenu = ({className} : LoadMenuProps) => {
    return (
        <div
            className={cn('flex justify-center', className)}
        >
            <Spinner size={60} />
        </div>
    )
}

export default LoadMenu

