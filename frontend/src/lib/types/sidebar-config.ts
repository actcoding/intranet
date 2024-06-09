import { LucideIcon, LucideProps } from "lucide-react";
import { ReactNode } from "react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React from "react";

export type SidebarConfig = {
    breakpoint?: string;
    links: SidebarLink[];
    extras?: ReactNode;
};

export interface SidebarLink {
    label: string;
    href: string;
    icon: React.ReactElement<LucideProps>;
}
