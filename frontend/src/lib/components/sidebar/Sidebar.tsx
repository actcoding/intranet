import { getAppSession } from '@/lib/actions/auth'
import { Button } from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {
    SidebarContainer,
    SidebarFooter,
    SidebarHeader,
    SidebarItems,
    SidebarUserDetails,
} from '@/lib/components/sidebar/components'
import SidebarProvider from '@/lib/components/sidebar/hooks/useSidebar'
import { isCreator } from '@/lib/utils'
import { SidebarLink } from '@/types'
import { HomeIcon, NewspaperIcon, PlusIcon, Settings2Icon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
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
                    <ResponsiveDialog>
                        <ResponsiveDialogTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <PlusIcon size={20} />
                            </Button>
                        </ResponsiveDialogTrigger>
                        <ResponsiveDialogContent>
                            <ResponsiveDialogBody>hi</ResponsiveDialogBody>
                        </ResponsiveDialogContent>
                    </ResponsiveDialog>
                </SidebarHeader>
                <SidebarItems links={sidebarLinks} />
                <SidebarFooter>
                    <SidebarUserDetails loggedInUser={sessionData?.user} />
                </SidebarFooter>
            </SidebarContainer>
        </SidebarProvider>
    )
}

export { Sidebar }
