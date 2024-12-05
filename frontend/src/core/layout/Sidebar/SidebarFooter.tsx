'use client'

import { useSidebar } from '@/core/hooks/useSidebar'
import React from 'react'

interface SidebarFooterProps {
    children: React.ReactNode;
}

const SidebarFooter = (props: SidebarFooterProps) => {
    const { isDesktop } = useSidebar()
    if (isDesktop) {
        return (
            <div className="absolute bottom-3 left-0 px-3">
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

export { SidebarFooter }
