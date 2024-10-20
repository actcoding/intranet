'use client'

import {
    editNewsAction,
    restoreNewsAction,
} from '@/lib/actions/news'
import { NewsResource } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/lib/components/common/Dropdown'
import {
    DeleteNewsDropdownMenuItem,
    PublishNewsDropdownMenuItem,
} from '@/lib/components/manage/manage-news/manage-news-table/components'
import NewsStatusBadge from '@/lib/components/shared/NewsStatusBadge'
import dayjs from '@/lib/dayjs'
import { ColumnDef, Row } from '@tanstack/react-table'
import {
    ArchiveRestore,
    Edit2Icon,
    EyeIcon,
    FileUpIcon,
    MoreHorizontal,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function CellActions({ row }: { row: Row<NewsResource> }) {
    const news = row.original
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
                {news.status === 'draft' ? (
                    <PublishNewsDropdownMenuItem newsId={news.id}>
                        <span>Veröffentlichen</span>
                    </PublishNewsDropdownMenuItem>
                ) : null}
                {news.status === 'active' ? (
                    <DropdownMenuItem
                        onClick={() => {
                            editNewsAction({
                                id: news.id,
                                newsUpdateRequest: { status: 'draft' },
                            })
                            router.refresh()
                        }}
                    >
                        <FileUpIcon size={16} className="mr-2" />
                        <span>Veröffentlichung aufheben</span>
                    </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem asChild>
                    <Link href={`/news/${news.id}`}>
                        <EyeIcon size={16} className="mr-2" />
                        Vorschau
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/manage/news/${news.id}`}>
                        <Edit2Icon size={16} className="mr-2" />
                        Bearbeiten
                    </Link>
                </DropdownMenuItem>
                {news.status !== 'deleted' ? (
                    <DeleteNewsDropdownMenuItem newsId={news.id}>
                        Löschen
                    </DeleteNewsDropdownMenuItem>
                ) : null}
                {news.status === 'deleted' ? (
                    <DropdownMenuItem
                        onClick={() => {
                            restoreNewsAction(news.id)
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

export const columns: ColumnDef<NewsResource>[] = [
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const news = row.original
            return <NewsStatusBadge status={news.status} />
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
