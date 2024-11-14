'use client'

import EventStatusBadge from '@/lib/components/shared/EventStatusBadge'
import { ColumnDef, Row } from '@tanstack/react-table'
import dayjs from '@/lib/dayjs'
import { useRouter } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/lib/components/common/Dropdown'
import { ArchiveRestore, Edit2Icon, EyeIcon, FileUpIcon, MoreHorizontal } from 'lucide-react'
import { Button } from '@/lib/components/common/Button'
import Link from 'next/link'
import { EventResource } from '@/lib/api/generated'
import { editEventAction, restoreEventAction } from '@/lib/actions/event'
import { DeleteEventDropdownMenuItem, PublishEventDropdownMenuItem } from '@/lib/components/manage/manage-events/manage-events-table/components'

function CellActions({ row }: {row: Row<EventResource>}) {
    const event = row.original
    const router = useRouter()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {event.status === 'draft' ? (
                    <PublishEventDropdownMenuItem eventId={event.id}>
                        <span>Veröffentlichen</span>
                    </PublishEventDropdownMenuItem>
                ) : null}
                {event.status === 'active' ? (
                    <DropdownMenuItem
                        onClick={() => {
                            editEventAction({
                                id: event.id,
                                eventUpdateRequest: { status: 'draft' },
                            })
                            router.refresh()
                        }}
                    >
                        <FileUpIcon size={16} className="mr-2" />
                        <span>Veröffentlichung aufheben</span>
                    </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem asChild>
                    <Link href={`/event/${event.id}`}>
                        <EyeIcon size={16} className="mr-2" />
                        Vorschau
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/manage/event/${event.id}`}>
                        <Edit2Icon size={16} className="mr-2" />
                        Bearbeiten
                    </Link>
                </DropdownMenuItem>
                {event.status !== 'deleted' ? (
                    <DeleteEventDropdownMenuItem eventId={event.id}>
                        Löschen
                    </DeleteEventDropdownMenuItem>
                ) : null}
                {event.status === 'deleted' ? (
                    <DropdownMenuItem
                        onClick={() => {
                            restoreEventAction(event.id)
                            router.refresh()
                        }}
                    >
                        <ArchiveRestore size={16} className="mr-2" />
                        <span>Wiederherstellen</span>
                    </DropdownMenuItem>
                ) : null}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<EventResource>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const event = row.original
            return <EventStatusBadge status={event.status} />
        },
    },
    {
        accessorKey: 'title',
        header: 'Titel',
    },
    {
        accessorKey: 'createdAt',
        header: 'Erstellt',
        cell: ({ row }) => dayjs(row.original.createdAt).format('lll'),
    },
    {
        accessorKey: 'updatedAt',
        header: 'Geändert',
        cell: ({ row }) => dayjs(row.original.updatedAt).format('lll'),
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellActions row={row} />,
    },
]
