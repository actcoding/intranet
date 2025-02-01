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
                <ChevronLeftIcon />
                <span className="ml-1">
                    {children}
                </span>
            </Link>
        </Button>
    )
}
