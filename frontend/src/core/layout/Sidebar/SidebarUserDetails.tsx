import { handleLogout } from '@/lib/actions/auth'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/lib/components/common/Avatar'
import { Button } from '@/lib/components/common/Button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/lib/components/common/Dropdown'
import { User } from '@/types'
import { LogInIcon, LogOutIcon, MoreVerticalIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface SidebarUserDetailsProps {
    loggedInUser?: User;
}

const SidebarUserDetails = (props: SidebarUserDetailsProps) => {
    const t = useTranslations('Sidebar')
    if (props.loggedInUser) {
        return (
            <DropdownMenu>
                <Button
                    asChild
                    variant={'ghost'}
                    size={'icon'}
                    className="w-full gap-2 whitespace-normal rounded-full"
                >
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage
                                src={props.loggedInUser.avatar_url ?? ''}
                                alt={props.loggedInUser.email}
                            />
                            <AvatarFallback>
                                {props.loggedInUser?.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left text-sm">
                            <span className="block font-semibold">
                                {props.loggedInUser.name}
                            </span>
                            <span className="block text-muted-foreground">
                                {props.loggedInUser.email}
                            </span>
                        </div>
                        <MoreVerticalIcon className="ml-auto mr-2" size={20} />
                    </DropdownMenuTrigger>
                </Button>
                <DropdownMenuContent className="w-52">
                    <DropdownMenuLabel>{t('my-account')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <form action={handleLogout}>
                        <Button
                            type="submit"
                            variant="ghost"
                            size={null}
                            className="w-full justify-start"
                        >
                            <DropdownMenuItem className="w-full">
                                <LogOutIcon size={15} className="mr-1" />
                                {t('logout')}
                            </DropdownMenuItem>
                        </Button>
                    </form>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    } else {
        return (
            <Button className="w-full rounded-full" variant={'outline'} asChild>
                <Link href={'/auth/login'}>
                    <LogInIcon className="mr-2" size={20} />
                    {t('creator-login')}
                </Link>
            </Button>
        )
    }
}
export { SidebarUserDetails }
