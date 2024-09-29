'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/lib/components/common/Dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/lib/components/common/Drawer'
import { useMediaQuery } from 'usehooks-ts'

interface BaseProps {
    children: React.ReactNode;
}

export interface RootResponsiveDialogProps extends BaseProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export interface ResponsiveDialogProps extends BaseProps {
    className?: string;
    asChild?: true;
}

const desktop = '(min-width: 768px)'

const ResponsiveDialog = ({
    children,
    ...props
}: RootResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialog = isDesktop ? Dialog : Drawer

    return <ResponsiveDialog {...props}>{children}</ResponsiveDialog>
}

const ResponsiveDialogTrigger = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger

    return (
        <ResponsiveDialogTrigger className={className} {...props}>
            {children}
        </ResponsiveDialogTrigger>
    )
}

const ResponsiveDialogClose = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogClose = isDesktop ? DialogClose : DrawerClose

    return (
        <ResponsiveDialogClose className={className} {...props}>
            {children}
        </ResponsiveDialogClose>
    )
}

const ResponsiveDialogContent = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogContent = isDesktop ? DialogContent : DrawerContent

    return (
        <ResponsiveDialogContent className={className} {...props}>
            {children}
        </ResponsiveDialogContent>
    )
}

const ResponsiveDialogDescription = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogDescription = isDesktop
        ? DialogDescription
        : DrawerDescription

    return (
        <ResponsiveDialogDescription className={className} {...props}>
            {children}
        </ResponsiveDialogDescription>
    )
}

const ResponsiveDialogHeader = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogHeader = isDesktop ? DialogHeader : DrawerHeader

    return (
        <ResponsiveDialogHeader className={className} {...props}>
            {children}
        </ResponsiveDialogHeader>
    )
}

const ResponsiveDialogTitle = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogTitle = isDesktop ? DialogTitle : DrawerTitle

    return (
        <ResponsiveDialogTitle className={className} {...props}>
            {children}
        </ResponsiveDialogTitle>
    )
}

const ResponsiveDialogBody = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    return (
        <div className={cn('px-4 md:px-0', className)} {...props}>
            {children}
        </div>
    )
}

const ResponsiveDialogFooter = ({
    className,
    children,
    ...props
}: ResponsiveDialogProps) => {
    const isDesktop = useMediaQuery(desktop)
    const ResponsiveDialogFooter = isDesktop ? DialogFooter : DrawerFooter

    return (
        <ResponsiveDialogFooter className={className} {...props}>
            {children}
        </ResponsiveDialogFooter>
    )
}

export {
    ResponsiveDialog,
    ResponsiveDialogTrigger,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogBody,
    ResponsiveDialogFooter,
}
