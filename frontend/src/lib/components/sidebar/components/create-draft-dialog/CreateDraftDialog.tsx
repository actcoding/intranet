'use client'

import { Button, ButtonProps } from '@/lib/components/common/Button'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import CreateDraftForm, {
    CreateContentFormProps,
} from '@/lib/components/shared/create-content-draft-form/CreateDraftForm'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

interface CreateDraftDialogProps {
    triggerButtonProps?: {
        triggerButtonLabel?: string;
        triggerButtonVariant: ButtonProps['variant'];
    };
    formProps?: Omit<CreateContentFormProps, 'onSuccess'>;
}

const CreateDraftDialog = ({
    triggerButtonProps = {
        triggerButtonLabel: 'Inhalt erstellen',
        triggerButtonVariant: 'outline',
    },
    formProps,
}: CreateDraftDialogProps) => {
    const [open, setOpen] = useState(false)

    return (
        <ResponsiveDialog open={open} onOpenChange={setOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button variant={triggerButtonProps?.triggerButtonVariant}>
                    <PlusIcon size={20} className="mr-2" />
                    {triggerButtonProps.triggerButtonLabel}
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
                    <CreateDraftForm
                        onSuccess={() => setOpen(false)}
                        {...formProps}
                    />
                </ResponsiveDialogBody>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { CreateDraftDialog }
