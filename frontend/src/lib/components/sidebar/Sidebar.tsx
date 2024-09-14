'use client'

import { Button } from '@/lib/components/common/Button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from '@/lib/components/common/Sheet'
import {
    NavigationMenu,
    NavigationMenuList,
} from '@/lib/components/sidebar/components/NavigationMenu'
import { SidebarItem } from '@/lib/components/sidebar/components/SidebarItem'
import { SidebarLink } from '@/types/sidebar-link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

import { useMediaQuery } from 'usehooks-ts'

interface SidebarProps {
    breakpoint?: string;
    children: React.ReactNode;
}

const SidebarContext = React.createContext({ isDesktop: false })

const Sidebar = (props: SidebarProps) => {
    const isDesktop = useMediaQuery(`(min-width: ${props.breakpoint})`, {
        initializeWithValue: false,
    })

    return (
        <SidebarContext.Provider value={{ isDesktop }}>
            {isDesktop ? (
                <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
                    <div className="h-full px-3 py-4">{props.children}</div>
                </aside>
            ) : (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="fixed left-3 top-3"
                        >
                            <Menu size={20} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="px-3 py-4" hideClose>
                        {props.children}
                    </SheetContent>
                </Sheet>
            )}
        </SidebarContext.Provider>
    )
}

interface SidebarHeaderProps {
    children: React.ReactNode;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
    const { isDesktop } = React.useContext(SidebarContext)
    if (isDesktop) {
        return <div className="flex items-center px-4">{props.children}</div>
    } else {
        return (
            <SheetHeader className="flex flex-row items-center justify-between space-y-0 px-4">
                {props.children}
                <SheetClose asChild>
                    <Button className="size-7 p-0" variant="ghost">
                        <X size={15} />
                    </Button>
                </SheetClose>
            </SheetHeader>
        )
    }
}

interface SidebarItemsProps {
    links: SidebarLink[];
}

const SidebarItems = (props: SidebarItemsProps) => {
    const pathname = usePathname()
    const currentPage = '/' + pathname.split('/')[1]
    return (
        <NavigationMenu
            orientation="vertical"
            className="max-w-none flex-col items-stretch"
        >
            <NavigationMenuList className="mt-4 flex-col items-stretch gap-2 space-x-0">
                {props.links.map((link, index) => {
                    if (!link.hidden) {
                        return (
                            <SidebarItem
                                href={link.href}
                                active={currentPage === link.href}
                                icon={link.icon}
                                key={index}
                            >
                                {link.label}
                            </SidebarItem>
                        )
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface SidebarFooterProps {
    children: React.ReactNode;
}
const SidebarFooter = (props: SidebarFooterProps) => {
    const { isDesktop } = React.useContext(SidebarContext)
    if (isDesktop) {
        return (
            <div className="absolute bottom-3 left-0 w-full px-3">
                {props.children}
            </div>
        )
    } else {
        return (
            <div className="absolute bottom-4 left-0 w-full px-3">
                {props.children}
            </div>
        )
    }
}

export { Sidebar, SidebarFooter, SidebarHeader, SidebarItems }
