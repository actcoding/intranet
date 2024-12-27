import '@/app/globals.css'
import {Sidebar, SidebarProvider, SidebarTrigger} from '@/core/layout/Sidebar'
import {cookies} from 'next/headers'
import React from 'react'

export default async function ShellLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies()
    const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true'

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar />
            <main className="mx-5 mt-16 h-screen w-full sm:mt-3">
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    )
}
