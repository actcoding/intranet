'use client'

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
import CreateDraftForm from '@/lib/components/shared/create-content-draft-form/CreateDraftForm'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const CreateDraftDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <ResponsiveDialog open={open} onOpenChange={setOpen}>
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
                        speichern. Danach kann der Inhalt vollumfänglich
                        bearbeitet werden.
                    </ResponsiveDialogDescription>
                </ResponsiveDialogHeader>
                <ResponsiveDialogBody>
                    <CreateDraftForm onSuccess={() => setOpen(false)} />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { CreateDraftDialog }
