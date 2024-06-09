import { handleLogout } from "@/app/actions";
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
import { LogInIcon, LogOutIcon, MoreVerticalIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface SidebarUserDetailsProps {
    loggedInUser?: User;
}

const SidebarUserDetails = (props: SidebarUserDetailsProps) => {
    const t = useTranslations("Sidebar");
    if (props.loggedInUser) {
        return (
            <DropdownMenu>
                <Button
                    asChild
                    variant={"ghost"}
                    size={"icon"}
                    className="gap-2 w-full rounded-full whitespace-normal"
                >
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage
                                src={props.loggedInUser.avatar_url ?? ""}
                                alt={props.loggedInUser.email}
                            />
                            <AvatarFallback>
                                {props.loggedInUser?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="text-sm text-left flex-1">
                            <span className="inline-block font-semibold">
                                {props.loggedInUser.name}
                            </span>
                            <span className="inline-block text-muted-foreground">
                                {props.loggedInUser.email}
                            </span>
                        </div>
                        <MoreVerticalIcon className="ml-auto mr-2" size={20} />
                    </DropdownMenuTrigger>
                </Button>
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
