"use client";

import {
    SidebarDesktop,
    SidebarDesktopFooter,
    SidebarDesktopHeader,
    SidebarDesktopLinks,
} from "@/lib/components/sidebar/components/SidebarDesktop";
import SidebarFooter from "@/lib/components/sidebar/components/SidebarFooter";
import SidebarHeader from "@/lib/components/sidebar/components/SidebarHeader";
import {
    SidebarMobile,
    SidebarMobileFooter,
    SidebarMobileHeader,
    SidebarMobileLinks,
} from "@/lib/components/sidebar/components/SidebarMobile";
import { SidebarLink } from "@/lib/types/sidebar-config";

import { useMediaQuery } from "usehooks-ts";

interface SidebarProps {
    loggedInUser?: User;
    breakpoint?: string;
    links: SidebarLink[];
}

const Sidebar = (props: SidebarProps) => {
    const isDesktop = useMediaQuery(`(min-width: ${props.breakpoint})`, {
        initializeWithValue: false,
    });

    if (isDesktop) {
        return (
            <SidebarDesktop>
                <SidebarDesktopHeader>
                    <SidebarHeader />
                </SidebarDesktopHeader>
                <SidebarDesktopLinks links={props.links} />
                <SidebarDesktopFooter>
                    <SidebarFooter loggedInUser={props.loggedInUser} />
                </SidebarDesktopFooter>
            </SidebarDesktop>
        );
    }

    return (
        <SidebarMobile>
            <SidebarMobileHeader>
                <SidebarHeader />
            </SidebarMobileHeader>
            <SidebarMobileLinks links={props.links} />
            <SidebarMobileFooter>
                <SidebarFooter loggedInUser={props.loggedInUser} />
            </SidebarMobileFooter>
        </SidebarMobile>
    );
};
export default Sidebar;
