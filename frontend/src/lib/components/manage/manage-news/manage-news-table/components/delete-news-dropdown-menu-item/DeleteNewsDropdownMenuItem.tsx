"use client";
import { deleteNewsAction } from "@/lib/actions/news";
import { DropdownMenuItem } from "@/lib/components/common/Dropdown";
import { DropdownMenuItemProps } from "@radix-ui/react-dropdown-menu";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteNewsDropdownMenuItemProps extends DropdownMenuItemProps {
    newsId: number;
    callbackUrl?: string;
}

const DeleteNewsDropdownMenuItem = ({
    newsId,
    children,
    callbackUrl,
    ...props
}: DeleteNewsDropdownMenuItemProps) => {
    const router = useRouter();
    return (
        <DropdownMenuItem
            onClick={() => {
                deleteNewsAction(newsId);
                callbackUrl ? router.push(callbackUrl) : router.refresh();
            }}
            {...props}
        >
            <Trash2Icon size={16} className="mr-2 text-destructive" />
            <div className="text-destructive">{children}</div>
        </DropdownMenuItem>
    );
};
export { DeleteNewsDropdownMenuItem };
