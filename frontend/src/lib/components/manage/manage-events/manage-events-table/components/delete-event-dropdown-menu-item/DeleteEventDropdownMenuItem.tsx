import { deleteEventAction } from '@/lib/actions/event'
import { DropdownMenuItem, DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import { Trash2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DeleteEventDropdownMenuItemProps extends DropdownMenuItemProps {
    eventId: number;
    callbackUrl?: string;
}

const DeleteEventDropdownMenuItem = ({
    eventId,
    children,
    callbackUrl,
    ...props
} : DeleteEventDropdownMenuItemProps) => {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={() => {
                deleteEventAction(eventId)
                callbackUrl ? router.push(callbackUrl) : router.refresh()
            }}
            {...props}
        >
            <Trash2Icon size={16} className="mr-2 text-destructive" />
            <div className="text-destructive">{children}</div>
        </DropdownMenuItem>
    )
}

export {DeleteEventDropdownMenuItem}