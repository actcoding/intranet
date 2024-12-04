'use client'

import { uploadEventFileAction } from '@/lib/actions/events'
import { Button } from '@/lib/components/common/Button'
import { useEvent } from '@/lib/components/events/event-form'
import { useToast } from '@/lib/components/hooks/use-toast'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import {
    FileSelector,
    FileSelectorBody,
    FileSelectorContent,
    FileSelectorFooter,
    FileSelectorHeader,
    FileSelectorInput,
    FileSelectorTitle,
    FileSelectorTrigger,
} from '@/lib/components/shared/FileSelector'
import { serializeFileData } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export const EventAttachmentsFormField = () => {
    const [files, setFiles] = useState<File[]>([])
    const { toast } = useToast()
    const router = useRouter()
    const { event } = useEvent()

    const onChange = useCallback(
        async (files: File[]) => {
            const { error } = await uploadEventFileAction(
                event.id,
                'attachment',
                serializeFileData(files),
            )
            if (error) {
                toast({
                    title: 'Fehler beim Hochladen',
                    description: error.message,
                    variant: 'destructive',
                })
            }

            router.refresh()
        },
        [event.id, router, toast],
    )

    return (
        <>
            <FileSelector
                onPreviewChange={(files) => setFiles(files ?? [])}
                onChange={onChange}
                multiple
            >
                <FileSelectorTrigger asChild>
                    <Button variant={'outline'}>
                        <PlusIcon size={16} className="mr-2" />
                        <span>Anhänge hinzufügen</span>
                    </Button>
                </FileSelectorTrigger>
                <FileSelectorContent>
                    <FileSelectorHeader>
                        <FileSelectorTitle>
                            Anhänge hinzufügen
                        </FileSelectorTitle>
                    </FileSelectorHeader>
                    <FileSelectorBody>
                        <FileSelectorInput />
                    </FileSelectorBody>
                    <FileListPreview display="grid" files={files} />
                    <FileSelectorFooter />
                </FileSelectorContent>
            </FileSelector>
        </>
    )
}
