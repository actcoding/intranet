"use client";

import { SidebarButton } from "@/lib/components/sidebar/components/SidebarButton";
import { SidebarLink } from "@/lib/types/sidebar-config";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarDesktopProps {
    links: SidebarLink[];
    extras?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}
const SidebarDesktop = (props: SidebarDesktopProps) => {
    const pathname = usePathname();
    return (
        <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
            <div className="h-full px-3 py-4">
                {props.header}
                <div className="mt-5">
                    <div className="flex flex-col gap-1 w-full">
                        {props.links.map((link, index) => (
                            <Link key={index} href={link.href}>
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
                    <div className="absolute left-0 bottom-3 w-full px-3">
                        {props.footer}
                    </div>
                </div>
            </div>
        </aside>
    );
};
export default SidebarDesktop;
