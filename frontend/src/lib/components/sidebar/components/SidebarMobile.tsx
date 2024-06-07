"use client";

import { Button } from "@/lib/components/common/Button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/lib/components/common/Sheet";
import { SidebarButton } from "@/lib/components/sidebar/components/SidebarButton";
import { SidebarLink } from "@/lib/types/sidebar-config";
import { Menu, X, MoreHorizontal, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMobileProps {
    links: SidebarLink[];
    extras?: React.ReactNode;
    footer?: React.ReactNode;
}
const SidebarMobile = (props: SidebarMobileProps) => {
    const pathname = usePathname();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="fixed top-3 left-3"
                >
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-3 py-4" hideClose>
                <SheetHeader className="flex flex-row justify-between items-center space-y-0">
                    <span className="text-lg font-semibold text-foreground mx-3">
                        Sidebar
                    </span>
                    <SheetClose asChild>
                        <Button className="h-7 w-7 p-0" variant="ghost">
                            <X size={15} />
                        </Button>
                    </SheetClose>
                </SheetHeader>
                <div className="h-full">
                    <div className="mt-5 flex flex-col w-full gap-1">
                        {props.links.map((link, idx) => (
                            <Link key={idx} href={link.href}>
                                <SidebarButton
                                    variant={
                                        pathname === link.href
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    icon={link.icon}
                                    className="w-full"
                                >
                                    {link.label}
                                </SidebarButton>
                            </Link>
                        ))}
                        {props.extras}
                    </div>
                    <div className="absolute w-full bottom-4 px-1 left-0">
                        {props.footer}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
export default SidebarMobile;
