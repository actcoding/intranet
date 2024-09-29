'use client'

import { editNewsAction } from '@/lib/actions/news'
import { DropdownMenuItem } from '@/lib/components/common/Dropdown'
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu'
import { FileUpIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PublishNewsDropdownItemProps extends DropdownMenuItemProps {
    newsId: number;
    callbackUrl?: string;
}

const PublishNewsDropdownMenuItem = ({
    newsId,
    children,
    callbackUrl,
    ...props
}: PublishNewsDropdownItemProps) => {
    const router = useRouter()
    return (
        <DropdownMenuItem
            onClick={() => {
                editNewsAction({
                    id: newsId,
                    newsUpdateRequest: { status: 'active' },
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
export { PublishNewsDropdownMenuItem }
