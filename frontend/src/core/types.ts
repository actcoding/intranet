import {LucideProps} from 'lucide-react'
import React from 'react'

export type SidebarMenuGroup = {
    label: string;
    action?: React.JSX.Element;
    hidden?: boolean;
    items: SidebarMenuItem[];
}

export type SidebarMenuItem = {
    title: string;
    url: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
    hidden?: boolean;
} | {
    title: string;
    icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
    hidden?: boolean;
    items: SidebarMenuSubItem[];
}

export type SidebarMenuSubItem = {
    title: string;
    url: string;
}
