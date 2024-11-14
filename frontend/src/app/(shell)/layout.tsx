import '@/app/globals.css'
import { Sidebar } from '@/lib/components/sidebar/Sidebar'

export default async function ShellLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Sidebar />
            <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">{children}</main>
        </>
    )
}
