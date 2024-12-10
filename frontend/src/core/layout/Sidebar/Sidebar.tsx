import SidebarProvider from '@/core/hooks/useSidebar'
import {
    CreateDraftDialog,
    SidebarContainer,
    SidebarFooter,
    SidebarHeader,
    SidebarItems,
    SidebarUserDetails,
} from '@/core/layout/Sidebar'
import {getAppSession} from '@/lib/actions/auth'
import {isCreator} from '@/lib/utils'
import {SidebarLink} from '@/types'
import {HomeIcon, NewspaperIcon, Settings2Icon} from 'lucide-react'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'

const Sidebar = async () => {
    const { sessionData } = await getAppSession()
    const t = await getTranslations('Sidebar')

    const sidebarLinks: SidebarLink[] = [
        { label: t('home'), href: '/', icon: <HomeIcon /> },
        { label: t('news'), href: '/news', icon: <NewspaperIcon /> },
        {
            label: t('manage'),
            href: '/manage',
            icon: <Settings2Icon />,
            hidden: !isCreator(sessionData),
        },
    ]
    return (
        <SidebarProvider>
            <SidebarContainer>
                <SidebarHeader>
                    <Image src="/logo.png" alt="logo" width={25} height={25} />
                    <h3 className="mx-3 text-lg font-semibold text-foreground">
                        Intranet
                    </h3>
                </SidebarHeader>
                <SidebarItems links={sidebarLinks} />
                { isCreator(sessionData) ? <CreateDraftDialog /> : null}
                <SidebarFooter>
                    <SidebarUserDetails loggedInUser={sessionData?.user} />
                </SidebarFooter>
            </SidebarContainer>
        </SidebarProvider>
    )
}

export { Sidebar }
