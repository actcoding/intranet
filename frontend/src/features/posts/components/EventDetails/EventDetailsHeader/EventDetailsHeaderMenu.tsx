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
import {EyeIcon, EyeOffIcon, MoreHorizontalIcon, PenIcon, Trash2Icon, UndoIcon} from 'lucide-react'
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
            toaster.toast({title: 'Fehler beim Löschen', variant: 'destructive'})
            console.error(e)
        }
    }

    const handleRestore: () => void = async () => {
        try {
            await restoreEvent({id: event.id})
            router.refresh()
            toaster.toast({title: 'Löschen rückgängig gemacht'})
        } catch (e) {
            toaster.toast({title: 'Fehler beim Wiederherstellen', variant: 'destructive'})
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
            toaster.toast({title: 'Fehler beim Veröffentlichen', variant: 'destructive'})
            console.error(e)
        }
    }

    const handleUnpublish = async () => {
        try {
            await updateEvent({id: event.id, eventUpdateRequest: {status: 'draft'}})
            router.refresh()
            toaster.toast({title: 'Veröffentlichung rückgängig gemacht'})
        } catch (e) {
            toaster.toast({title: 'Fehler beim Zurückziehen der Veröffentlichung', variant: 'destructive'})
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
                {event.status === 'deleted' ? null :
                    <>
                        <Link href={`/manage/events/${event.id}`}>
                            <DropdownMenuItem>
                                <PenIcon size={16} className="mr-2" />
                                Bearbeiten
                            </DropdownMenuItem>
                        </Link><DropdownMenuItem
                            onClick={() => event.status === 'draft' ? handlePublish() : handleUnpublish()}>
                            {event.status === 'active' ?
                                <>
                                    <EyeOffIcon size={16} className="mr-2" />
                                    <span>Veröffentlichung aufheben</span>
                                </>
                                :
                                <>
                                    <EyeIcon size={16} className="mr-2" />
                                    <span>Veröffentlichen</span>
                                </>}
                        </DropdownMenuItem>
                    </>
                }
                <DropdownMenuItem
                    onClick={() => event.status === 'deleted' ? handleRestore() : handleDelete()}
                >
                    {event.status === 'deleted' ?
                        <>
                            <UndoIcon size={16} className="mr-2"/>
                            <span>Wiederherstellen</span>
                        </>
                        :
                        <>
                            <Trash2Icon size={16} className="mr-2"/>
                            <span>Löschen</span>
                        </>
                    }
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

