"use client";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/lib/components/sidebar/components/NavigationMenu";
import { SidebarItem } from "@/lib/components/sidebar/components/SidebarItem";
import { SidebarLink } from "@/lib/types/sidebar-config";
import { usePathname } from "next/navigation";

interface SidebarDesktopProps {
    children: React.ReactNode;
}
const SidebarDesktop = (props: SidebarDesktopProps) => {
    return (
        <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
            <div className="h-full px-3 py-4">{props.children}</div>
        </aside>
    );
};

interface SidebarDesktopLinksProps {
    links: SidebarLink[];
}

const SidebarDesktopLinks = (props: SidebarDesktopLinksProps) => {
    const pathname = usePathname();
    return (
        <NavigationMenu
            orientation="vertical"
            className="max-w-none flex-col items-stretch"
        >
            <NavigationMenuList className="flex-col items-stretch space-x-0 gap-2 mt-4">
                {props.links.map((link, index) => (
                    <SidebarItem
                        href={link.href}
                        active={pathname === link.href}
                        icon={link.icon}
                        key={index}
                    >
                        {link.label}
                    </SidebarItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
};

interface SidebarDesktopHeaderProps {
    children: React.ReactNode;
}

const SidebarDesktopHeader = (props: SidebarDesktopHeaderProps) => {
    return props.children;
};

interface SidebarDesktopFooterProps {
    children: React.ReactNode;
}

const SidebarDesktopFooter = (props: SidebarDesktopFooterProps) => {
    return (
        <div className="absolute left-0 bottom-3 w-full px-3">
            {props.children}
        </div>
    );
};

export {
    SidebarDesktop,
    SidebarDesktopFooter,
    SidebarDesktopHeader,
    SidebarDesktopLinks,
};
