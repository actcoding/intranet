import '@/app/globals.css'
import { Sidebar } from '@/core/layout/Sidebar'
import React from 'react'

export default async function ShellLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            <main className="mx-5 mt-16 h-screen sm:ml-[300px] sm:mt-3">
                {children}
            </main>
        </>
    )
}
