"use client";

import { Button } from "@/lib/components/common/Button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/lib/components/common/Sheet";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/lib/components/sidebar/components/NavigationMenu";
import { SidebarItem } from "@/lib/components/sidebar/components/SidebarItem";
import { SidebarLink } from "@/lib/types/sidebar-link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

import { useMediaQuery } from "usehooks-ts";

interface SidebarProps {
    breakpoint?: string;
    children: React.ReactNode;
}

const SidebarContext = React.createContext({ isDesktop: false });

const Sidebar = (props: SidebarProps) => {
    const isDesktop = useMediaQuery(`(min-width: ${props.breakpoint})`, {
        initializeWithValue: false,
    });

    return (
        <SidebarContext.Provider value={{ isDesktop }}>
            {isDesktop ? (
                <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
                    <div className="h-full px-3 py-4">{props.children}</div>
                </aside>
            ) : (
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
            )}
        </SidebarContext.Provider>
    );
};

interface SidebarHeaderProps {
    children: React.ReactNode;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
    const { isDesktop } = React.useContext(SidebarContext);
    if (isDesktop) {
        return <div className="flex items-center px-4">{props.children}</div>;
    } else {
        return (
            <SheetHeader className="flex flex-row justify-between items-center space-y-0 px-4">
                {props.children}
                <SheetClose asChild>
                    <Button className="h-7 w-7 p-0" variant="ghost">
                        <X size={15} />
                    </Button>
                </SheetClose>
            </SheetHeader>
        );
    }
};

interface SidebarItemsProps {
    links: SidebarLink[];
}

const SidebarItems = (props: SidebarItemsProps) => {
    const pathname = usePathname();
    const currentPage = "/" + pathname.split("/")[1];
    return (
        <NavigationMenu
            orientation="vertical"
            className="max-w-none flex-col items-stretch"
        >
            <NavigationMenuList className="flex-col items-stretch space-x-0 gap-2 mt-4">
                {props.links.map((link, index) => {
                    if (!link.hidden) {
                        return (
                            <SidebarItem
                                href={link.href}
                                active={currentPage === link.href}
                                icon={link.icon}
                                key={index}
                            >
                                {link.label}
                            </SidebarItem>
                        );
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

interface SidebarFooterProps {
    children: React.ReactNode;
}
const SidebarFooter = (props: SidebarFooterProps) => {
    const { isDesktop } = React.useContext(SidebarContext);
    if (isDesktop) {
        return (
            <div className="absolute left-0 bottom-3 w-full px-3">
                {props.children}
            </div>
        );
    } else {
        return (
            <div className="absolute w-full bottom-4 px-3 left-0">
                {props.children}
            </div>
        );
    }
};

export { Sidebar, SidebarFooter, SidebarHeader, SidebarItems };
