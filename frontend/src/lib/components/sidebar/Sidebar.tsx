"use client";

import { Button } from "@/lib/components/common/Button";
import SidebarDesktop from "@/lib/components/sidebar/components/SidebarDesktop";
import SidebarMobile from "@/lib/components/sidebar/components/SidebarMobile";
import { SidebarConfig } from "@/lib/types/sidebar-config";
import { Home, LogInIcon } from "lucide-react";
import Link from "next/link";
import { useMediaQuery } from "usehooks-ts";

const sidebarConfig: SidebarConfig = {
    breakpoint: "640px",
    header: (
        <h3 className="mx-3 text-lg font-semibold text-foreground">Sidebar</h3>
    ),
    links: [{ label: "Home", href: "/", icon: Home }],
    footer: (
        <Button className="w-full" variant={"outline"} asChild>
            <Link href={"/auth/login"}>
                <LogInIcon className="mr-2" size={20} />
                Creator-Login
            </Link>
        </Button>
    ),
};

export function Sidebar() {
    const isDesktop = useMediaQuery(
        `(min-width: ${sidebarConfig.breakpoint})`,
        {
            initializeWithValue: false,
        }
    );

    if (isDesktop) {
        return <SidebarDesktop {...sidebarConfig} />;
    }

    return <SidebarMobile {...sidebarConfig} />;
}
