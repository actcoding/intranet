'use client'

import { Button } from '@/lib/components/common/Button'
import { SheetClose, SheetHeader } from '@/lib/components/common/Sheet'
import { useSidebar } from '@/lib/components/sidebar/hooks/useSidebar'
import { X } from 'lucide-react'
import React from 'react'

interface SidebarHeaderProps {
    children: React.ReactNode;
}

const SidebarHeader = (props: SidebarHeaderProps) => {
    const { isDesktop } = useSidebar()
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

export { SidebarHeader }
