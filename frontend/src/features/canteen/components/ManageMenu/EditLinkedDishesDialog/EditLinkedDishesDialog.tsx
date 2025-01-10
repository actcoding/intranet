'use client'

import {searchDishes, updateMenu} from '@/features/canteen/actions'
import {EditLinkedDishesDialogFormField} from '@/features/canteen/components/ManageMenu'
import {LinkDishFormProvider} from '@/features/canteen/contexts'
import {LinkDishFormValues} from '@/features/canteen/types'
import {DishResource, MenuResource} from '@/lib/api/generated'
import {Alert} from '@/lib/components/common/Alert'
import {Button} from '@/lib/components/common/Button'
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
import {Link2Icon, PlusCircleIcon, SearchIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import React, {ChangeEvent, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

interface EditLinkedDishesDialogProps {
    menu: MenuResource;
}

const EditLinkedDishesDialog = ({menu}: EditLinkedDishesDialogProps) => {
    const [searchResults, setSearchResults] = useState<DishResource[] | undefined>(undefined)
    const [open, setOpen] = useState(false)
    const {refresh} = useRouter()
    const {toast} = useToast()

    const handleSearchInputChange =
        useDebounceCallback(async (event: ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value
            const res = await searchDishes({query})
            setSearchResults(res)
        }, 1000)

    const handleSubmit = async (values: LinkDishFormValues) => {
        const dishIds = menu.dishes?.map(dish => dish.id) ?? []
        const newDishIds = [values.dishId, ...dishIds]
        try {
            await updateMenu({menu: menu.id, menuUpdateRequest: {dishes: newDishIds}})
            setOpen(false)
            toast({title: 'Gericht hinzugefügt', description: 'Das Gericht wurde erfolgreich hinzugefügt'})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Hinzufügen des Gerichts aufgetreten', variant: 'destructive'})
            refresh()
        }
    }

    return (
        <ResponsiveDialog open={open} onOpenChange={setOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button className="size-full min-h-[200px]" variant="outline">
                    <PlusCircleIcon className="mr-2" />
                    Gericht hinzufügen
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <LinkDishFormProvider onSubmit={handleSubmit}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Gericht auswählen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody>
                        <div className="relative my-3">
                            <Input placeholder="Suche nach Gericht" type="search" className="pl-8" onChange={handleSearchInputChange}
                            />
                            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </div>
                        {!searchResults ? <Alert>Tippen, um mit der Suche zu beginnen</Alert> : searchResults.length === 0 ? <Alert>Keine Ergebnisse</Alert> :
                            <ScrollArea className="h-[500px]">
                                <EditLinkedDishesDialogFormField items={searchResults} menu={menu} />
                            </ScrollArea>}
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>
                            <Link2Icon className="mr-2" size={16} />
                            <span>Verknüpfen</span>
                        </FormSubmitButton>
                    </ResponsiveDialogFooter>
                </LinkDishFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { EditLinkedDishesDialog }
