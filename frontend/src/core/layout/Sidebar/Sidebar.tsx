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
    SidebarMenuSubItem,
    SidebarUserDetails,
} from '@/core/layout/Sidebar'
import {SidebarMenuGroup} from '@/core/types'
import {getAppSession} from '@/lib/actions/auth'
import {isCreator} from '@/lib/utils'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/shared/components/Collapsible'
import {CalendarDays, HomeIcon, NewspaperIcon} from 'lucide-react'
import {getTranslations} from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
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
                        {title: 'Tage', url: '/manage/canteen/plan'},
                        {title: 'Menüs', url: '/manage/canteen/menus'},
                        {title: 'Gerichte', url: '/manage/canteen/meals'},
                        {title: 'Allergene/Inhaltsstoffe', url: '/manage/canteen/notes'},
                        {title: 'Preise', url: '/manage/canteen/prices'},
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
                                                                    <SidebarMenuSubItem key={index}>
                                                                        <SidebarMenuButton asChild>
                                                                            <Link href={subItem.url}>
                                                                                <span>{subItem.title}</span>
                                                                            </Link>
                                                                        </SidebarMenuButton>
                                                                    </SidebarMenuSubItem>
                                                                ))}
                                                            </SidebarMenuSub>
                                                        </CollapsibleContent>
                                                    </SidebarMenuItem>
                                                </Collapsible>
                                            )
                                        } else {
                                            return (
                                                <SidebarMenuItem key={index}>
                                                    <SidebarMenuButton asChild>
                                                        <Link href={item.url}>
                                                            {item.icon ? <item.icon /> : null}
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
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
