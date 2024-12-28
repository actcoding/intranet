'use client'

import {createMenu} from '@/features/canteen/actions'
import {MenuNameFormField} from '@/features/canteen/components/ManageMenus'
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
    const {refresh} = useRouter()
    const {toast} = useToast()

    const handleSubmit = (values: MenuFormValues) => {
        try {
            createMenu(values)
            setIsOpen(false)
            toast({
                title: 'Menü erstellt',
                description: `Das Menü "${values.name}" wurde erfolgreich erstellt`,
            })
            refresh()
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
                <Button size="icon">
                    <PlusIcon size={16} />
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <MenuFormProvider onSubmit={handleSubmit} defaultValues={{name: '', nutrition: '', defaultPrice: 0}}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Menü erstellen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody className="space-y-3">
                        <MenuNameFormField />
                        TODO: Add more fields
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
