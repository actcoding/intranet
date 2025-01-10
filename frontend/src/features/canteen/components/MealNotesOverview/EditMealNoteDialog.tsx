'use client'

import {updateMealNote} from '@/features/canteen/actions'
import {MealNoteTitleFormField} from '@/features/canteen/components/MealNotesOverview/MealNoteTitleFormField'
import {MealNoteTypeFormField} from '@/features/canteen/components/MealNotesOverview/MealNoteTypeFormField'
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
import {PencilIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface EditMealNoteDialogProps {
    note: any;
}

const EditMealNoteDialog = ({note}: EditMealNoteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { refresh } = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (values: MealNoteFormValues) => {
        try {
            await updateMealNote({ingredient: note.id, ingredientUpdateRequest: values})
            setIsOpen(false)
            toast({title: 'Hinweis aktualisiert', description: `Der Hinweis "${values.name}" wurde erfolgreich aktualisiert.`})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Beim Bearbeiten des Hinweises ist ein Fehler aufgetreten.', variant: 'destructive'})
        }
    }

    return (
        <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                    <PencilIcon size={16} className="mr-2" />
                    Bearbeiten
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <MealNoteFormProvider onSubmit={handleSubmit} defaultValues={note}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Hinweis bearbeiten</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody>
                        <div className="my-3 space-y-3">
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
    )
}

export { EditMealNoteDialog }
