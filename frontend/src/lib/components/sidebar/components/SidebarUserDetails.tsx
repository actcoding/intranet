import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/lib/components/common/Avatar";
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
import { useTranslations } from "next-intl";
import { handleLogout } from "@/app/actions";

interface SidebarUserDetailsProps {
    loggedInUser?: User;
}

const SidebarUserDetails = (props: SidebarUserDetailsProps) => {
    const t = useTranslations("Sidebar");
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
                    <DropdownMenuLabel>{t("my-account")}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <form action={handleLogout}>
                        <Button
                            type="submit"
                            variant="ghost"
                            size={null}
                            className="w-full justify-start"
                        >
                            <DropdownMenuItem className="w-full">
                                <LogOutIcon size={15} className="mr-1" />
                                {t("logout")}
                            </DropdownMenuItem>
                        </Button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    } else {
        return (
            <Button className="w-full rounded-full" variant={"outline"} asChild>
                <Link href={"/auth/login"}>
                    <LogInIcon className="mr-2" size={20} />
                    {t("creator-login")}
                </Link>
            </Button>
        );
    }
};
export default SidebarUserDetails;
