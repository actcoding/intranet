'use client'

import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

export const SidebarContext = React.createContext({ isDesktop: false })

interface SidebarProviderProps {
    children: React.ReactNode;
}

const SidebarProvider = (props: SidebarProviderProps) => {
    const isDesktop = useMediaQuery('(min-width: 640px)', {
        initializeWithValue: false,
    })

    return (
        <SidebarContext.Provider value={{ isDesktop }}>
            {props.children}
        </SidebarContext.Provider>
    )
}

export const useSidebar = () => {
    const context = React.useContext(SidebarContext)
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider')
    }
    return context
}

export default SidebarProvider
