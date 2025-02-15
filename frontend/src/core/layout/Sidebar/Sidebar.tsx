import {
    CreateDraftSidebarGroupAction,
    SidebarContainer,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarUserDetails,
} from '@/core/layout/Sidebar'
import {SidebarMenuItemClient} from '@/core/layout/Sidebar/SidebarMenuItem.client'
import {SidebarMenuGroup} from '@/core/types'
import {getAppSession} from '@/lib/actions/auth'
import {isCreator} from '@/lib/utils'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/shared/components/Collapsible'
import {CalendarDays, HomeIcon, NewspaperIcon, Utensils} from 'lucide-react'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'
import React from 'react'

export const Sidebar = async () => {
    const t = await getTranslations('Sidebar')
    const { sessionData } = await getAppSession()

    const items: SidebarMenuGroup[] = [
        {
            label: 'Inhalte',
            action: isCreator(sessionData) ? <CreateDraftSidebarGroupAction /> : undefined,
            items: [
                { title: t('home'), url: '/', icon: HomeIcon },
                { title: t('news'), url: '/news', icon: NewspaperIcon },
                { title: t('events'), url: '/events', icon: CalendarDays },
                { title: t('canteen'), url: '/canteen', icon: Utensils },
            ],
        },
        {
            label: t('manage'),
            hidden: !isCreator(sessionData),
            items: [
                { title: 'Neuigkeiten', url: '/manage/news' },
                { title: 'Veranstaltungen', url: '/manage/events' },
                {
                    title: 'Speiseplan',
                    items: [
                        {title: 'Planung', url: '/manage/canteen/plan'},
                        {title: 'Menüs', url: '/manage/canteen/menus'},
                        {title: 'Gerichte', url: '/manage/canteen/dishes'},
                        {title: 'Hinweise', url: '/manage/canteen/notes'},
                    ],
                },
            ],
        },
    ]

    return (
        <SidebarContainer>
            <SidebarHeader>
                <div className="flex items-center justify-center">
                    <Image src="/logo.png" alt="logo" width={25} height={25} />
                    <h3 className="mx-3 text-lg font-semibold text-foreground">
                        Intranet
                    </h3>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {items.map((group, index) => !group.hidden ? (
                    <SidebarGroup key={index}>
                        {group.label ? <SidebarGroupLabel>{group.label}</SidebarGroupLabel> : null}
                        {group.action}
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item, index) => {
                                    if (!item.hidden) {
                                        if ('items' in item) {
                                            return (
                                                <Collapsible key={index} defaultOpen className="group/collapsible">
                                                    <SidebarMenuItem>
                                                        <CollapsibleTrigger asChild>
                                                            <SidebarMenuButton>
                                                                {item.icon ? <item.icon /> : null}
                                                                <span>{item.title}</span>
                                                            </SidebarMenuButton>
                                                        </CollapsibleTrigger>
                                                        <CollapsibleContent>
                                                            <SidebarMenuSub>
                                                                {item.items.map((subItem, index) => (
                                                                    <SidebarMenuItemClient url={subItem.url} key={index}>
                                                                        <span>{subItem.title}</span>
                                                                    </SidebarMenuItemClient>
                                                                ))}
                                                            </SidebarMenuSub>
                                                        </CollapsibleContent>
                                                    </SidebarMenuItem>
                                                </Collapsible>
                                            )
                                        } else {
                                            return (
                                                <SidebarMenuItemClient url={item.url} key={index}>
                                                    {item.icon ? <item.icon /> : null}
                                                    <span>{item.title}</span>
                                                </SidebarMenuItemClient>
                                            )
                                        }
                                    }
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ) : null)}
            </SidebarContent>
            <SidebarFooter>
                <SidebarUserDetails loggedInUser={sessionData?.user} />
            </SidebarFooter>
        </SidebarContainer>
    )
}
