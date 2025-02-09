'use client'

import { uploadEventFile } from '@/features/posts/actions'
import { usePost } from '@/features/posts/hooks'
import { Event } from '@/features/posts/types'
import { eventDetachFile } from '@/lib/actions/event'
import { AttachmentResourceData } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
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
    const { post } = usePost<Event>()

    const onChange = useCallback(
        async (files: File[]) => {
            const { error } = await uploadEventFile(
                post.id,
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
        [post.id, router, toast],
    )

    const onRemove = async (file: File | AttachmentResourceData) => {
        if (!(file instanceof File)) {
            await eventDetachFile(post.id, file.id)
        }
        router.refresh()
    }

    return (
        <>
            <FileSelector
                onPreviewChange={(files) => {
                    setFiles(files ?? [])
                }}
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
            {post.attachments ? (
                <FileListPreview
                    files={post.attachments?.map((file) => file.data)}
                    display="list"
                    download
                    onRemove={onRemove}
                />
            ) : null}
        </>
    )
}
