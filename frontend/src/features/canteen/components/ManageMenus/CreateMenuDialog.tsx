'use client'

import {createMenu} from '@/features/canteen/actions'
import {
    MenuDefaultPriceFormField,
    MenuNameFormField,
    MenuNutritionFormField,
} from '@/features/canteen/components/MenuForm'
import {MenuFormProvider} from '@/features/canteen/contexts'
import {MenuFormValues} from '@/features/canteen/types'
import {Button} from '@/lib/components/common/Button'
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
import {PlusIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

const CreateMenuDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {push} = useRouter()
    const {toast} = useToast()

    const handleSubmit = async (values: MenuFormValues) => {
        try {
            // @ts-expect-error wrong api type
            const res = await createMenu({menuStoreRequest: values})
            setIsOpen(false)
            toast({
                title: 'Menü erstellt',
                description: `Das Menü "${values.name}" wurde erfolgreich erstellt`,
            })
            push(`/manage/canteen/menus/${res.id}`)
        } catch (e) {
            console.error(e)
            toast({
                title: 'Fehler',
                description: 'Es ist ein Fehler beim Erstellen des Menüs aufgetreten',
                variant: 'destructive',
            })
        }
    }

    return (
        <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button>
                    <PlusIcon size={16} className="mr-2" />
                    Menü erstellen
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <MenuFormProvider onSubmit={handleSubmit}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Menü erstellen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody className="my-3 space-y-3">
                        <MenuNameFormField />
                        <MenuNutritionFormField />
                        <MenuDefaultPriceFormField />
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>Erstellen</FormSubmitButton>
                    </ResponsiveDialogFooter>
                </MenuFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { CreateMenuDialog }
