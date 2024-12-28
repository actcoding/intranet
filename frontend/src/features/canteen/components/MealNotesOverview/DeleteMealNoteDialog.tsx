'use client'

import {deleteMealNote} from '@/features/canteen/actions'
import {Button} from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {useToast} from '@/lib/components/hooks/use-toast'
import {Trash2Icon} from 'lucide-react'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface DeleteMealNoteDialogProps {
    note: any;
}

const DeleteMealNoteDialog = ({note}: DeleteMealNoteDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { toast } = useToast()
    const { refresh } = useRouter()

    const handleDelete = async (note: any) => {
        try {
            deleteMealNote(note.id)
            setIsOpen(false)
            toast({title: 'Hinweis gelöscht', description: `Der Hinweis "${note.name}" wurde erfolgreich gelöscht.`})
            refresh()
        } catch (e) {
            console.error(e)
            toast({title: 'Fehler', description: 'Beim Löschen des Hinweises ist ein Fehler aufgetreten.', variant: 'destructive'})
        }
    }

    return (
        <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2Icon size={20}/>
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>Hinweis löschen</ResponsiveDialogTitle>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody>{`Soll der Hinweis "${note.name}" wirklich gelöscht werden?`}</ResponsiveDialogBody>
                <ResponsiveDialogFooter>
                    <ResponsiveDialogClose>
                        <Button variant="outline">
                            Abbrechen
                        </Button>
                    </ResponsiveDialogClose>
                    <Button variant="destructive" onClick={() => handleDelete(note)}>Löschen</Button>
                </ResponsiveDialogFooter>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { DeleteMealNoteDialog }
