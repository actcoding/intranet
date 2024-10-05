'use client'

import { Button } from '@/lib/components/common/Button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/lib/components/common/Sheet'
import { useSidebar } from '@/lib/components/sidebar/hooks/useSidebar'
import { Menu } from 'lucide-react'
import React from 'react'

interface SidebarWrapperProps {
    breakpoint?: string;
    children: React.ReactNode;
}

const SidebarContainer = (props: SidebarWrapperProps) => {
    const { isDesktop } = useSidebar()

    if (isDesktop) {
        return (
            <aside className="fixed left-0 top-0 z-40 h-screen w-[270px] max-w-xs border-r">
                <div className="h-full px-3 py-4">{props.children}</div>
            </aside>
        )
    } else {
        return (
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
        )
    }
}

export { SidebarContainer }
