import { LucideProps } from "lucide-react";
import React from "react";

export type SidebarLink = {
    label: string;
    href: string;
    icon: React.ReactElement<LucideProps>;
};
