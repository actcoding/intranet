import { Button, ButtonProps } from "@/lib/components/common/Button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SheetClose } from "@/lib/components/common/Sheet";
import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/lib/components/sidebar/components/NavigationMenu";
import Link from "next/link";
import { NavigationMenuItemProps } from "@radix-ui/react-navigation-menu";

interface SidebarItemProps extends NavigationMenuItemProps {
    icon?: LucideIcon;
    active?: boolean;
    href: string;
}

export function SidebarItem({
    icon: Icon,
    className,
    children,
    ...props
}: SidebarItemProps) {
    return (
        <NavigationMenuItem {...props}>
            <Link href={props.href} legacyBehavior passHref>
                <NavigationMenuLink
                    active={props.active}
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "gap-2 justify-start flex-grow w-full",
                        className
                    )}
                >
                    {Icon && <Icon size={20} />}
                    <span>{children}</span>
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
}

export function SidebarButtonSheet(props: SidebarItemProps) {
    return (
        <SheetClose asChild>
            <SidebarItem {...props} />
        </SheetClose>
    );
}
