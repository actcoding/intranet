
import { Event } from '@/lib/api/generated'
import EventStatusBadge from '@/lib/components/shared/EventsStatusBadge'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Event>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const news = row.original
            return <EventStatusBadge status={news.status} />
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
