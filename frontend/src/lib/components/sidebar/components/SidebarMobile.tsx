import { Button } from "@/lib/components/common/Button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/lib/components/common/Sheet";
import {
    NavigationMenu,
    NavigationMenuList,
} from "@/lib/components/sidebar/components/NavigationMenu";
import { SidebarItem } from "@/lib/components/sidebar/components/SidebarItem";
import { SidebarLink } from "@/lib/types/sidebar-config";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarMobileProps {
    children: React.ReactNode;
}

const SidebarMobile = (props: SidebarMobileProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="fixed top-3 left-3"
                >
                    <Menu size={20} />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-3 py-4" hideClose>
                {props.children}
            </SheetContent>
        </Sheet>
    );
};

interface SidebarMobileHeaderProps {
    children: React.ReactNode;
}

const SidebarMobileHeader = (props: SidebarMobileHeaderProps) => {
    return (
        <SheetHeader className="flex flex-row justify-between items-center space-y-0">
            {props.children}
            <SheetClose asChild>
                <Button className="h-7 w-7 p-0" variant="ghost">
                    <X size={15} />
                </Button>
            </SheetClose>
        </SheetHeader>
    );
};

interface SidebarMobileLinksProps {
    links: SidebarLink[];
}

const SidebarMobileLinks = (props: SidebarMobileLinksProps) => {
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

interface SidebarMobileFooterProps {
    children: React.ReactNode;
}

const SidebarMobileFooter = (props: SidebarMobileFooterProps) => {
    return (
        <div className="absolute w-full bottom-4 px-3 left-0">
            {props.children}
        </div>
    );
};

export {
    SidebarMobile,
    SidebarMobileFooter,
    SidebarMobileHeader,
    SidebarMobileLinks,
};
