import { editEventAction } from '@/lib/actions/event'
import { DropdownMenuItem } from '@/lib/components/common/Dropdown'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import { FileUpIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PublishEventDropdownMenuItemProps extends DropdownMenuItemProps {
    eventId: number;
    callbackUrl?: string;
}

const PublishEventDropdownMenuItem = ({
    eventId,
    children,
    callbackUrl,
    ...props
} : PublishEventDropdownMenuItemProps) => {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={() => {
                editEventAction({
                    id: eventId,
                    eventUpdateRequest: { status: 'active' },
                })
                callbackUrl ? router.push(callbackUrl) : router.refresh()
            }}
            {...props}
        >
            <FileUpIcon size={16} className="mr-2" />
            {children}
        </DropdownMenuItem>
    )
}

export { PublishEventDropdownMenuItem }