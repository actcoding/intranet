'use client'

import {SidebarMenuButton, SidebarMenuItem} from '@/core/layout/Sidebar/SidebarContainer'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import React from 'react'

interface SidebarMenuItemClientProps {
    url: string;
    children: React.ReactNode;
}

export const SidebarMenuItemClient = ({url, children}: SidebarMenuItemClientProps) => {
    const pathname = usePathname()

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={url === '/' ? pathname === '/' : pathname.startsWith(url)}>
                <Link href={url}>
                    {children}
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )
}
