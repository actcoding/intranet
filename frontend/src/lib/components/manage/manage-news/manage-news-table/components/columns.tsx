"use client";

import { deleteNewsAction } from "@/lib/actions/news";
import { Button } from "@/lib/components/common/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/lib/components/common/Dropdown";
import NewsStatusBadge from "@/lib/components/shared/NewsStatusBadge";
import { ColumnDef } from "@tanstack/react-table";
import { Edit2Icon, EyeIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import Link from "next/link";

export const columns: ColumnDef<News>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const news = row.original;
            return <NewsStatusBadge status={news.status} />;
        },
    },
    {
        accessorKey: "title",
        header: "Title",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const news = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/news/${news.id}`}>
                                <EyeIcon size={16} className="mr-2" />
                                Preview
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href={`/manage/news/${news.id}`}>
                                <Edit2Icon size={16} className="mr-2" />
                                Edit
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => deleteNewsAction(news.id)}
                        >
                            <Trash2Icon
                                size={16}
                                className="mr-2 text-destructive"
                            />
                            <span className="text-destructive">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
