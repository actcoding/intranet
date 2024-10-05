import { Button } from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import CreateContentForm from '@/lib/components/shared/create-content-form/CreateContentForm'
import { PlusIcon } from 'lucide-react'

const AddContentAction = () => {
    return (
        <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
                <Button size="icon" variant="ghost">
                    <PlusIcon size={20} />
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <ResponsiveDialogHeader>
                    <ResponsiveDialogTitle>
                        Neuen Inhalt erstellen
                    </ResponsiveDialogTitle>
                    <ResponsiveDialogDescription>
                        Gib unten einen Titel für den Entwurf ein und klicke auf
                        speichern. Danach kann der Artikel vollumfänglich
                        bearbeitet werden.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody>
                    <CreateContentForm />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { AddContentAction }
