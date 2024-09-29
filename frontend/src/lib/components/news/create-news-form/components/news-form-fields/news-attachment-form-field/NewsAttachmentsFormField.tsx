'use client'

import { uploadNewsFileAction } from '@/lib/actions/news'
import { Button } from '@/lib/components/common/Button'
import { useToast } from '@/lib/components/hooks/use-toast'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import { FileSelector, FileSelectorBody, FileSelectorContent, FileSelectorFooter, FileSelectorHeader, FileSelectorInput, FileSelectorTitle, FileSelectorTrigger } from '@/lib/components/shared/FileSelector'
import { serializeFileData } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type Props = {
    id: number
}

export default function NewsAttachmentsFormField({ id }: Props) {
    const [files, setFiles] = useState<File[]>([])
    const { toast } = useToast()
    const router = useRouter()

    const onChange = useCallback(async (files: File[]) => {
        const { error } = await uploadNewsFileAction(id, 'attachment', serializeFileData(files))
        if (error) {
            toast({
                title: 'Fehler beim Hochladen',
                description: error.message,
                variant: 'destructive',
            })
        }

        router.refresh()
    }, [id, router, toast])

    return (<>
        <FileSelector
            onPreviewChange={files => setFiles(files ?? [])}
            onChange={onChange}
            multiple
        >
            <FileSelectorTrigger asChild>
                <Button variant={'outline'}>
                    <PlusIcon size={16} className="mr-2" />
                    <span>
                        Anhänge hinzufügen
                    </span>
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
                <FileListPreview
                    display='grid'
                    files={files}
                />
                <FileSelectorFooter />
            </FileSelectorContent>
        </FileSelector>
    </>)
}
