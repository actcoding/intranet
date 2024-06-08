import { handleLogout } from "@/app/actions";
import LogoutButton from "@/lib/components/auth/LogoutButton";
import Image from "next/image";
import { Button } from "@/lib/components/common/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/lib/components/common/Dropdown";
import { LogInIcon, LogOutIcon, MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/lib/components/common/Avatar";

interface SidebarFooterProps {
    loggedInUser?: User;
}

const SidebarFooter = (props: SidebarFooterProps) => {
    const router = useRouter();
    const logout = useCallback(async () => {
        const res = await handleLogout();
        if (res === undefined) {
            router.push("/auth/login");
        }
    }, [router]);

    if (props.loggedInUser) {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger
                    className="flex items-center gap-2 w-full"
                    asChild
                >
                    <Button
                        variant={"ghost"}
                        className="justify-start rounded-full p-0"
                    >
                        <Avatar>
                            <AvatarImage
                                src={props.loggedInUser.avatar_url ?? ""}
                                alt={props.loggedInUser.email}
                            />
                            <AvatarFallback>
                                {props.loggedInUser &&
                                    props.loggedInUser.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                            </AvatarFallback>
                        </Avatar>
                        {props.loggedInUser.name}
                        <MoreHorizontalIcon
                            className="ml-auto mr-2"
                            size={20}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOutIcon className="mr-1" size={16} /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    } else {
        return (
            <Button className="w-full rounded-full" variant={"outline"} asChild>
                <Link href={"/auth/login"}>
                    <LogInIcon className="mr-2" size={20} />
                    Creator-Login
                </Link>
            </Button>
        );
    }
};
export default SidebarFooter;
