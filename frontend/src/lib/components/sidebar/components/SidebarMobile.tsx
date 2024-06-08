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
import SidebarFooter from "@/lib/components/sidebar/components/SidebarFooter";
import SidebarHeader from "@/lib/components/sidebar/components/SidebarHeader";
import { SidebarLink } from "@/lib/types/sidebar-config";
import { Menu, X, MoreHorizontal, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarMobileProps {
    children: React.ReactNode;
}

const SidebarMobile = (props: SidebarMobileProps) => {
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
                {props.children}
            </SheetContent>
        </Sheet>
    );
};

interface SidebarMobileHeaderProps {
    children: React.ReactNode;
}

const SidebarMobileHeader = (props: SidebarMobileHeaderProps) => {
    return (
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
            {props.children}
            <SheetClose asChild>
                <Button className="h-7 w-7 p-0" variant="ghost">
                    <X size={15} />
                </Button>
            </SheetClose>
        </SheetHeader>
    );
};

interface SidebarMobileLinksProps {
    links: SidebarLink[];
}

const SidebarMobileLinks = (props: SidebarMobileLinksProps) => {
    const pathname = usePathname();
    return (
        <div className="h-full">
            <div className="mt-5 flex flex-col w-full gap-1">
                {props.links.map((link, idx) => (
                    <Link key={idx} href={link.href}>
                        <SidebarButton
                            variant={
                                pathname === link.href ? "secondary" : "ghost"
                            }
                            icon={link.icon}
                            className="w-full"
                        >
                            {link.label}
                        </SidebarButton>
                    </Link>
                ))}
            </div>
        </div>
    );
};

interface SidebarMobileFooterProps {
    children: React.ReactNode;
}

const SidebarMobileFooter = (props: SidebarMobileFooterProps) => {
    return (
        <div className="absolute w-full bottom-4 px-1 left-0">
            {props.children}
        </div>
    );
};

export {
    SidebarMobile,
    SidebarMobileHeader,
    SidebarMobileLinks,
    SidebarMobileFooter,
};
