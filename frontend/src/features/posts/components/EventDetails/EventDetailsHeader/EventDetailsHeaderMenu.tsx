'use client'

import {deleteEvent, restoreEvent, updateEvent} from '@/features/posts/actions'
import {Event} from '@/features/posts/types'
import {Button} from '@/lib/components/common/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/lib/components/common/Dropdown'
import {ToastAction} from '@/lib/components/common/Toast'
import {useToast} from '@/lib/components/hooks/use-toast'
import {MoreHorizontalIcon, PenIcon} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

interface EventDetailsHeaderMenuProps {
    event: Event
}

export const EventDetailsHeaderMenu = ({event}: EventDetailsHeaderMenuProps) => {
    const router = useRouter()
    const toaster = useToast()

    const handleDelete = async () => {
        try {
            await deleteEvent({id: event.id})
            router.refresh()
            toaster.toast({title: 'Event gelöscht', action: (
                <ToastAction altText="Löschen rückgängig machen" onClick={handleRestore}>Rückgängig</ToastAction>
            )})
        } catch (e) {
            console.error(e)
        }
    }

    const handleRestore: () => void = async () => {
        try {
            await restoreEvent({id: event.id})
            router.refresh()
            toaster.toast({title: 'Löschen rückgängig gemacht'})
        } catch (e) {
            console.error(e)
        }
    }

    const handlePublish = async () => {
        try {
            await updateEvent({id: event.id, eventUpdateRequest: {status: 'active'}})
            router.refresh()
            toaster.toast({title: 'Event veröffentlicht', action: (
                <ToastAction altText="Veröffentlichung rückgängig machen" onClick={handleUnpublish}>Rückgängig</ToastAction>
            )})
        } catch (e) {
            console.error(e)
        }
    }

    const handleUnpublish = async () => {
        try {
            await updateEvent({id: event.id, eventUpdateRequest: {status: 'draft'}})
            router.refresh()
            toaster.toast({title: 'Veröffentlichung rückgängig gemacht'})
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} size={'icon'}>
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <Link href={`/manage/events/${event.id}`}>
                    <DropdownMenuItem>
                        <PenIcon size={16} className="mr-2" />
                        Bearbeiten
                    </DropdownMenuItem>
                </Link>
                {event.status === 'deleted' ? null : <DropdownMenuItem onClick={() => event.status === 'draft' ? handlePublish() : handleUnpublish()}>
                    {event.status === 'active' ? 'Veröffentlichung zurückziehen' : 'Veröffentlichen'}
                </DropdownMenuItem>}
                <DropdownMenuItem
                    onClick={() => event.status === 'deleted' ? handleRestore() : handleDelete()}
                >
                    {event.status === 'deleted' ? 'Löschen rückgängig machen' : 'Löschen'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

