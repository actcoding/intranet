import {SidebarGroupAction} from '@/core/layout/Sidebar/SidebarContainer'
import DraftForm from '@/features/posts/components/DraftForm/DraftForm'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {PlusIcon} from 'lucide-react'
import React from 'react'

const CreateDraftSidebarGroupAction = () => {
    return (
        <ResponsiveDialog>
            <ResponsiveDialogTrigger asChild>
                <SidebarGroupAction>
                    <PlusIcon />
                </SidebarGroupAction>
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
                    <DraftForm />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { CreateDraftSidebarGroupAction }
