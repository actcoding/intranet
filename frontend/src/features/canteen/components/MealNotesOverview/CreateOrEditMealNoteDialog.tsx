'use client'

import {createMealNote, updateMealNote} from '@/features/canteen/actions'
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
import {PencilIcon, PlusIcon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface CreateOrEditMealNoteDialogProps {
    note?: any;
}

const CreateOrEditMealNoteDialog = ({note}: CreateOrEditMealNoteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { refresh } = useRouter()
    const { toast } = useToast()

    const handleSubmit = (values: MealNoteFormValues) => {
        try {
            if(note) {
                updateMealNote({noteId: note.id, values})
                setIsOpen(false)
                toast({title: 'Hinweis aktualisiert', description: `Der Hinweis "${values.name}" wurde erfolgreich aktualisiert.`})
                refresh()
            } else {
                createMealNote(values)
                setIsOpen(false)
                toast({title: 'Hinweis erstellt', description: `Der Hinweis "${values.name}" wurde erfolgreich erstellt.`})
                refresh()
            }
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Beim Speichern des Hinweises ist ein Fehler aufgetreten.', variant: 'destructive'})
        }
    }

    return (
        <>
            <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
                <ResponsiveDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                        {note ? <PencilIcon size={20} /> : <PlusIcon size={20} />}
                    </Button>
                </ResponsiveDialogTrigger>
                <ResponsiveDialogContent>
                    <MealNoteFormProvider onSubmit={handleSubmit} defaultValues={note}>
                        <ResponsiveDialogHeader>
                            <ResponsiveDialogTitle>{note ? 'Hinweis bearbeiten' : 'Neuen Hinweis erstellen'}</ResponsiveDialogTitle>
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

export { CreateOrEditMealNoteDialog }
