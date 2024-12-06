import '@/app/globals.css'
import { getAppSession } from '@/lib/actions/auth'
import {
    Sidebar,
    SidebarFooter,
    SidebarHeader,
    SidebarItems,
} from '@/lib/components/sidebar/Sidebar'
import SidebarUserDetails from '@/lib/components/sidebar/components/SidebarUserDetails'
import { SidebarLink } from '@/types/sidebar-link'
import { isCreator } from '@/lib/utils'
import { HomeIcon, NewspaperIcon, Settings2Icon, CalendarDaysIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

export default async function ShellLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { sessionData } = await getAppSession()
    const t = await getTranslations('Sidebar')

    const sidebarLinks: SidebarLink[] = [
        { label: t('home'), href: '/', icon: <HomeIcon /> },
        { label: t('news'), href: '/news', icon: <NewspaperIcon /> },
        { label: t('events'), href: '/events', icon: <CalendarDaysIcon />},
        {
            label: t('manage'),
            href: '/manage',
            icon: <Settings2Icon />,
            hidden: !isCreator(sessionData),
        },
    ]

    return (<>
        <Sidebar breakpoint="640px">
            <SidebarHeader>
                <Image src="/logo.png" alt="logo" width={25} height={25} />
                <h3 className="mx-3 text-lg font-semibold text-foreground">
                    Intranet
                </h3>
            </SidebarHeader>
            <SidebarItems links={sidebarLinks} />
            <SidebarFooter>
                <SidebarUserDetails loggedInUser={sessionData?.user} />
            </SidebarFooter>
        </Sidebar>
        <main className="mx-5 mt-16 sm:ml-[300px] sm:mt-3">{children}</main>
    </>)
}
