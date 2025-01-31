'use client'

import {addMenuToPlan, searchMenus} from '@/features/canteen/actions'
import {
    LinkMenuDialogMenuIdFormField,
    LinkMenuDialogMenuPriceFormField,
} from '@/features/canteen/components/ManageMenuPlan'
import {LinkMenuFormProvider} from '@/features/canteen/contexts'
import {LinkMenuFormValues} from '@/features/canteen/types'
import {MenuResource} from '@/lib/api/generated'
import {Alert} from '@/lib/components/common/Alert'
import {Input} from '@/lib/components/common/Input'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {useToast} from '@/lib/components/hooks/use-toast'
import {FormSubmitButton} from '@/shared/components/FormSubmitButton'
import {ScrollArea} from '@/shared/components/ScrollArea'
import {format} from 'date-fns'
import {SearchIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import React, {ChangeEvent, ReactNode, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

interface LinkMenuDialogProps {
    day: Date;
    trigger: ReactNode;
}

export const LinkMenuDialog = ({trigger, day}: LinkMenuDialogProps) => {
    const [searchResults, setSearchResults] = useState<MenuResource[] | undefined>(undefined)
    const [open, setOpen] = useState(false)
    const {refresh} = useRouter()
    const {toast} = useToast()

    const handleSearchInputChange =
        useDebounceCallback(async (event: ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value
            const res = await searchMenus({query})
            setSearchResults(res)
        }, 1000)

    const handleSubmit = async (values: LinkMenuFormValues) => {
        try {
            await addMenuToPlan({menuServeRequest: {menuId: values.menuId, price: values.price, servedAt: format(day, 'yyyy-MM-dd')}})
            setOpen(false)
            toast({title: 'Menü eingeplant', description: 'Das Menü wurde erfolgreich eingeplant'})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Einplanen des Menüs aufgetreten', variant: 'destructive'})
            refresh()
        }
    }

    return (
        <ResponsiveDialog open={open} onOpenChange={setOpen}>
            <ResponsiveDialogTrigger asChild>
                {trigger}
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <LinkMenuFormProvider onSubmit={handleSubmit}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Menü hinzufügen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody>
                        <div className="relative my-3">
                            <Input placeholder="Suche nach Menü" type="search" className="pl-8" onChange={handleSearchInputChange} />
                            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </div>
                        <div className="mb-3 space-y-3">
                            {!searchResults ? <Alert>Tippen, um mit der Suche zu beginnen</Alert> : searchResults.length === 0 ? <Alert>Keine Ergebnisse</Alert> :
                                <ScrollArea className="h-[300px]">
                                    <LinkMenuDialogMenuIdFormField items={searchResults} />
                                </ScrollArea>
                            }
                            <LinkMenuDialogMenuPriceFormField />
                        </div>
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>Speichern</FormSubmitButton>
                    </ResponsiveDialogFooter>
                </LinkMenuFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}
