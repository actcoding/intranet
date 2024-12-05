import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from '@/lib/components/common/NavigationMenu'
import { SheetClose } from '@/lib/components/common/Sheet'
import { cn } from '@/lib/utils'
import { NavigationMenuItemProps } from '@radix-ui/react-navigation-menu'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'

interface SidebarItemProps extends NavigationMenuItemProps {
    icon: React.ReactElement<LucideProps>;
    active?: boolean;
    href: string;
}

const SidebarItem = ({
    icon: Icon,
    className,
    children,
    ...props
}: SidebarItemProps) => {
    return (
        <NavigationMenuItem {...props}>
            <Link href={props.href} legacyBehavior passHref>
                <NavigationMenuLink
                    active={props.active}
                    className={cn(
                        navigationMenuTriggerStyle(),
                        'gap-2 justify-start flex-grow w-full',
                        className,
                    )}
                >
                    <Icon.type {...Icon.props} size={20} />
                    <span>{children}</span>
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}

const SidebarButtonSheet = (props: SidebarItemProps) => {
    return (
        <SheetClose asChild>
            <SidebarItem {...props} />
        </SheetClose>
    )
}

export { SidebarItem, SidebarButtonSheet }
