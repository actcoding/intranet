'use client'

import {createMealNote} from '@/features/canteen/actions'
import {MealNoteTitleFormField, MealNoteTypeFormField} from '@/features/canteen/components/MealNotesOverview'
import {MealNoteFormProvider} from '@/features/canteen/contexts'
import {MealNoteFormValues} from '@/features/canteen/types'
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

const CreateMealNoteDialog = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { refresh } = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (values: MealNoteFormValues) => {
        try {
            await createMealNote({ingredientStoreRequest: values})
            setIsOpen(false)
            toast({title: 'Hinweis erstellt', description: `Der Hinweis "${values.name}" wurde erfolgreich erstellt.`})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Beim Speichern des Hinweises ist ein Fehler aufgetreten.', variant: 'destructive'})
        }
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
                <ResponsiveDialogTrigger asChild>
                    <Button size="icon">
                        <PlusIcon size={20} />
                    </Button>
                </ResponsiveDialogTrigger>
                <ResponsiveDialogContent>
                    <MealNoteFormProvider onSubmit={handleSubmit}>
                        <ResponsiveDialogHeader>
                            <ResponsiveDialogTitle>Neuen Hinweis erstellen</ResponsiveDialogTitle>
                        </ResponsiveDialogHeader>
                        <ResponsiveDialogBody>
                            <div className="mb-3 space-y-3">
                                <MealNoteTitleFormField />
                                <MealNoteTypeFormField />
                            </div>
                        </ResponsiveDialogBody>
                        <ResponsiveDialogFooter>
                            <FormSubmitButton>Speichern</FormSubmitButton>
                        </ResponsiveDialogFooter>
                    </MealNoteFormProvider>
                </ResponsiveDialogContent>
            </ResponsiveDialog>
        </>
    )
}

export { CreateMealNoteDialog }
