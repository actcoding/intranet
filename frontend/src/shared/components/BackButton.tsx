import {Button} from '@/lib/components/common/Button'
import {ChevronLeftIcon} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface BackButtonProps {
    href: string;
    children: React.ReactNode;
}

export const BackButton = ({href, children}: BackButtonProps) => {
    return (
        <Button asChild variant={'ghost'} size={'sm'} className={'h-6'}>
            <Link href={href}>
                <ChevronLeftIcon className={'mr-1'} />
                {children}
            </Link>
        </Button>
    )
}
