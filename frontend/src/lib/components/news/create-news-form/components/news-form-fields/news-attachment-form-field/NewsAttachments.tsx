'use client'

import { newsDetachFile } from '@/lib/actions/news'
import { AttachmentResource, AttachmentResourceData } from '@/lib/api/generated'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import { useRouter } from 'next/navigation'
import NewsAttachmentsFormField from './NewsAttachmentsFormField'

interface Props {
    id: number
    attachments: AttachmentResource[]
}

export function NewsAttachments({ id, attachments }: Props) {
    const router = useRouter()

    const onRemove = async (file: File | AttachmentResourceData) => {
        if (!(file instanceof File)) {
            await newsDetachFile(id, file.id)
        }
        router.refresh()
    }

    return (
        <div className='space-y-4'>
            <p className="text-sm font-medium leading-none">
                Anhänge
            </p>

            <NewsAttachmentsFormField id={id} />

            <FileListPreview
                files={attachments.map(file => file.data)}
                display='list'
                download
                onRemove={onRemove}
            />
        </div>
    )
}
