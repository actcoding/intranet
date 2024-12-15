'use client'

import { newsDetachFile, uploadNewsFileAction } from '@/lib/actions/news'
import { AttachmentResourceData } from '@/lib/api/generated'
import { useToast } from '@/lib/components/hooks/use-toast'
import { NewsHeaderImageUploadButton } from '@/lib/components/news/create-news-form/components/news-form-fields/news-header-image-form-field/components'
import {
    allowedFileTypes,
} from '@/lib/components/news/create-news-form/CreateNewsForm.config'
import FileImagePreview from '@/lib/components/shared/FileImagePreview'
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
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface Props {
    id: number
    current?: AttachmentResourceData
}

const NewsHeaderImageFormField = ({ id, current }: Props) => {
    const [file, setFile] = useState<File>()
    const { toast } = useToast()
    const router = useRouter()

    const onChange = useCallback(async (files: File[]) => {
        if (current) {
            await newsDetachFile(id, current.id)
        }

        const { error } = await uploadNewsFileAction(id, 'header', serializeFileData(files))
        if (error) {
            toast({
                title: 'Fehler beim Hochladen',
                description: error.message,
                variant: 'destructive',
            })
        }

        router.refresh()
    }, [current, id, router, toast])

    return (
        <FileSelector
            accept={allowedFileTypes.headerImage
                .map((type) => `.${type}`)
                .join(', ')}
            onPreviewChange={files => setFile(files?.[0])}
            onChange={onChange}
        >
            <FileSelectorTrigger asChild>
                <NewsHeaderImageUploadButton
                    file={current}
                />
            </FileSelectorTrigger>
            <FileSelectorContent>
                <FileSelectorHeader>
                    <FileSelectorTitle>
                        Titelbild ändern
                    </FileSelectorTitle>
                </FileSelectorHeader>
                <FileSelectorBody>
                    <FileSelectorInput />

                    {file === undefined ?
                        current === undefined ? null : (
                            <Image
                                src={current.url}
                                alt={current.name}
                                className="rounded-lg"
                            />
                        ) : (
                            <FileImagePreview image={file} />
                        )}
                </FileSelectorBody>
                <FileSelectorFooter />
            </FileSelectorContent>
        </FileSelector>
    )
}

export { NewsHeaderImageFormField }
