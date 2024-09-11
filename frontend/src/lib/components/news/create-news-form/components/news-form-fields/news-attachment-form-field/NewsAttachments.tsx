import { AttachmentResource } from '@/lib/api/generated'
import FileListPreview from '@/lib/components/shared/FileListPreview'
import NewsAttachmentsFormField from './NewsAttachmentsFormField'

interface Props {
    id: number
    attachments: AttachmentResource[]
}

export async function NewsAttachments({ id, attachments }: Props) {
    return (
        <div className='space-y-4'>
            <p className="text-sm font-medium leading-none">
                Anhänge
            </p>

            <NewsAttachmentsFormField id={id} />

            <FileListPreview
                display='list'
                files={attachments.map(file => file.data)}
                download
            />
        </div>
    )
}
