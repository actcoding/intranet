import { AttachmentResource } from '@/lib/api/generated'
import Image from 'next/image'
import { NewsHeaderImageFormField } from './NewsHeaderImageFormField'
import { ResponsiveDialog } from '@/lib/components/common/ResponsiveDialog'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/lib/components/common/Dialog'

interface Props {
    id: number
    attachments: AttachmentResource[]
}

interface PropsPreview {
    image: AttachmentResource['data'] | null
}

async function Preview({ image }: PropsPreview) {
    if (image === null) {
        return null
    }

    return (
        <Dialog>
            <DialogTrigger>
                <img src={image.url} alt={image.name} className='rounded shadow' />
            </DialogTrigger>
            <DialogContent className='w-3/4 max-w-none'>
                <DialogTitle>
                    Titelbild
                </DialogTitle>
                <img src={image.url} alt={image.name} className='rounded-lg shadow' />
            </DialogContent>
        </Dialog>
    )
}

export default async function NewsHeaderImage({ id, attachments }: Props) {
    return (
        <div className="relative space-y-4">
            <p className="text-sm font-medium leading-none">
                Titelbild
            </p>

            {/* <Preview image={attachments.length > 0 ? attachments[0].data : null} /> */}

            <NewsHeaderImageFormField id={id} current={attachments.length > 0 ? attachments[0].data : undefined} />
        </div>
    )
}