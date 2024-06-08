"use client";

import { SidebarButton } from "@/lib/components/sidebar/components/SidebarButton";
import SidebarFooter from "@/lib/components/sidebar/components/SidebarFooter";
import SidebarHeader from "@/lib/components/sidebar/components/SidebarHeader";
import { SidebarLink } from "@/lib/types/sidebar-config";
import Link from "next/link";
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
        <div className="flex flex-col gap-1 w-full mt-5">
            {props.links.map((link, index) => (
                <Link key={index} href={link.href}>
                    <SidebarButton
                        variant={pathname === link.href ? "secondary" : "ghost"}
                        icon={link.icon}
                        className="w-full"
                    >
                        {link.label}
                    </SidebarButton>
                </Link>
            ))}
        </div>
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
    SidebarDesktopLinks,
    SidebarDesktopHeader,
    SidebarDesktopFooter,
};
