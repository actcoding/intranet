'use client'

import { SidebarItem } from '@/core/layout/Sidebar/index'
import {
    NavigationMenu,
    NavigationMenuList,
} from '@/lib/components/common/NavigationMenu'
import { SidebarLink } from '@/types'
import { usePathname } from 'next/navigation'
import React from 'react'

interface SidebarItemsProps {
    links: SidebarLink[];
}

const SidebarItems = (props: SidebarItemsProps) => {
    const pathname = usePathname()
    const currentPage = '/' + pathname.split('/')[1]
    return (
        <NavigationMenu
            orientation="vertical"
            className="max-w-none flex-none flex-col items-stretch"
        >
            <NavigationMenuList className="flex-col items-stretch gap-2 space-x-0">
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

export { SidebarItems }
