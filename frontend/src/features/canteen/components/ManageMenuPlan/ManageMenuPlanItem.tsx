'use client'

import {addMenuToPlan, removeMenuFromPlan} from '@/features/canteen/actions'
import {LinkMenuDialogMenuPriceFormField} from '@/features/canteen/components/ManageMenuPlan/LinkMenuDialog'
import {EditPriceFormProvider} from '@/features/canteen/contexts'
import {EditPriceFormValues} from '@/features/canteen/types'
import {MenuPlanResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
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
import {Tooltip, TooltipContent, TooltipTrigger} from '@/shared/components/Tooltip'
import {CircleMinusIcon, EuroIcon, UtensilsIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface ManageMenuPlanItemProps {
    item: MenuPlanResource;
    isEntryEditable?: boolean;
}

export const ManageMenuPlanItem = ({item, isEntryEditable}: ManageMenuPlanItemProps) => {
    const {number} = useFormatter()
    const {toast} = useToast()
    const {refresh} = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const handleUnlink = async () => {
        try {
            await removeMenuFromPlan({menuId: item.menu.id, servedAt: item.servedAt})
            toast({title: 'Menü entfernt', description: 'Das Menü wurde erfolgreich entfernt'})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Entfernen des Menüs aufgetreten', variant: 'destructive'})
        }
    }

    const handleEditPriceSubmit = async (values: EditPriceFormValues) => {
        try {
            //@ts-expect-error Wrong API type
            await addMenuToPlan({menuServeRequest: {menuId: item.menu.id, price: values.price, servedAt: item.servedAt}})
            toast({title: 'Preis aktualisiert', description: 'Der Preis wurde erfolgreich aktualisiert'})
            setIsOpen(false)
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Aktualisieren des Preises aufgetreten', variant: 'destructive'})
        }
    }

    return (
        <Card>
            <CardHeader className={'items-start'}>
                <CardTitle>
                    {item.menu.name}
                </CardTitle>
                <Badge>{item.menu.nutrition === 'omnivorous' ? 'Mit Fleisch' : item.menu.nutrition === 'vegetarian' ? 'Vegetarisch' : 'Vegan'}</Badge>
                <CardDescription>
                    {number(item.price, { style: 'currency', currency: 'EUR' })}
                </CardDescription>
            </CardHeader>
            <CardFooter className={'justify-end gap-2'}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant={'outline'} size={'icon'} asChild>
                            <Link href={`/manage/canteen/menus/${item.menu.id}`}>
                                <UtensilsIcon size={16} />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Menü bearbeiten</TooltipContent>
                </Tooltip>
                <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
                    <Tooltip>
                        <ResponsiveDialogTrigger asChild>
                            <TooltipTrigger asChild ignoreDisabledChild>
                                <Button variant={'outline'} size={'icon'} disabled={!isEntryEditable}>
                                    <EuroIcon size={16} />
                                </Button>
                            </TooltipTrigger>
                        </ResponsiveDialogTrigger>
                        <TooltipContent>{isEntryEditable ? 'Tagespreis bearbeiten' : 'Du kannst den Tagespreis nicht mehr bearbeiten.'}</TooltipContent>
                    </Tooltip>
                    <ResponsiveDialogContent>
                        <EditPriceFormProvider onSubmit={handleEditPriceSubmit} defaultValues={{ price: item.price}}>
                            <ResponsiveDialogHeader>
                                <ResponsiveDialogTitle>
                                    Preis von {item.menu.name} bearbeiten
                                </ResponsiveDialogTitle>
                            </ResponsiveDialogHeader>
                            <ResponsiveDialogBody className={'my-3'}>
                                <LinkMenuDialogMenuPriceFormField />
                            </ResponsiveDialogBody>
                            <ResponsiveDialogFooter>
                                <FormSubmitButton>Speichern</FormSubmitButton>
                            </ResponsiveDialogFooter>
                        </EditPriceFormProvider>
                    </ResponsiveDialogContent>
                </ResponsiveDialog>
                <Tooltip>
                    <TooltipTrigger asChild ignoreDisabledChild>
                        <Button variant={'outline-destructive'} size={'icon'} onClick={handleUnlink} disabled={!isEntryEditable}>
                            <CircleMinusIcon size={16} />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isEntryEditable ? 'Menü vom Plan entfernen' : 'Du kannst das Menü nicht mehr vom Plan entfernen.'}</TooltipContent>
                </Tooltip>
            </CardFooter>
        </Card>
    )
}
