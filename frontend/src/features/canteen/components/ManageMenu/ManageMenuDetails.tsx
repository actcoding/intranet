'use client'

import {
    MenuDefaultPriceFormField,
    MenuNameFormField,
    MenuNutritionFormField,
} from '@/features/canteen/components/MenuForm'
import {MenuFormProvider} from '@/features/canteen/contexts'
import {MenuFormValues} from '@/features/canteen/types'
import {canteenApi} from '@/lib/api/api'
import {MenuResource} from '@/lib/api/generated'
import {useToast} from '@/lib/components/hooks/use-toast'
import {FormSubmitButton} from '@/shared/components/FormSubmitButton'
import {useRouter} from 'next/navigation'

interface ManageMenuDetailsProps {
    menu: MenuResource;
}

export const ManageMenuDetails = ({menu}: ManageMenuDetailsProps) => {
    const {toast} = useToast()
    const {refresh} = useRouter()

    const handleSubmit = async (values: MenuFormValues) => {
        try {
            await canteenApi.menuUpdate({menu: menu.id, menuUpdateRequest: values})
            toast({title: 'Menü gespeichert', description: `Das Menü "${values.name}" wurde erfolgreich aktualisiert`})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Es ist ein Fehler beim Speichern des Menüs aufgetreten', variant: 'destructive'})
        }
    }

    return (
        <>
            <MenuFormProvider onSubmit={handleSubmit} defaultValues={menu}>
                <div className="my-3 space-y-3">
                    <MenuNameFormField />
                    <MenuDefaultPriceFormField />
                    <MenuNutritionFormField />
                    <FormSubmitButton>Speichern</FormSubmitButton>
                </div>
            </MenuFormProvider>
        </>
    )
}
