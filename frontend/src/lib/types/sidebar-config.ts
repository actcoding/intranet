import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type SidebarConfig = {
    breakpoint?: string;
    links: SidebarLink[];
    extras?: ReactNode;
};

export type SidebarLink = {
    label: string;
    href: string;
    icon?: LucideIcon;
};
