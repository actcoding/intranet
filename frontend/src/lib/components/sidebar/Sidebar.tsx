"use client";

import {
    SidebarDesktop,
    SidebarDesktopLinks,
    SidebarDesktopFooter,
    SidebarDesktopHeader,
} from "@/lib/components/sidebar/components/SidebarDesktop";
import SidebarFooter from "@/lib/components/sidebar/components/SidebarFooter";
import SidebarHeader from "@/lib/components/sidebar/components/SidebarHeader";
import {
    SidebarMobile,
    SidebarMobileFooter,
    SidebarMobileHeader,
    SidebarMobileLinks,
} from "@/lib/components/sidebar/components/SidebarMobile";

import { Home } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

const sidebarConfig = {
    breakpoint: "640px",
    links: [{ label: "Home", href: "/", icon: Home }],
};

interface SidebarProps {
    loggedInUser?: User;
}

const Sidebar = (props: SidebarProps) => {
    const isDesktop = useMediaQuery(
        `(min-width: ${sidebarConfig.breakpoint})`,
        {
            initializeWithValue: false,
        }
    );

    if (isDesktop) {
        return (
            <SidebarDesktop>
                <SidebarDesktopHeader>
                    <SidebarHeader />
                </SidebarDesktopHeader>
                <SidebarDesktopLinks links={sidebarConfig.links} />
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
            <SidebarMobileLinks links={sidebarConfig.links} />
            <SidebarMobileFooter>
                <SidebarFooter loggedInUser={props.loggedInUser} />
            </SidebarMobileFooter>
        </SidebarMobile>
    );
};
export default Sidebar;
