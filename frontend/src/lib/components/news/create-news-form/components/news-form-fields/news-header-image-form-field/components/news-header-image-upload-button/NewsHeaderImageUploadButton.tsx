'use client'

import { AttachmentResourceData } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { ResponsiveDialogTrigger } from '@/lib/components/common/ResponsiveDialog'
import { UploadIcon } from 'lucide-react'

interface Props {
    file?: AttachmentResourceData;
}

export function NewsHeaderImageUploadButton({ file }: Props) {
    if (file) {
        return (
            <ResponsiveDialogTrigger>
                <div className="stack aspect-video items-center rounded-lg bg-black">
                    <img
                        src={file.url}
                        alt={file.name}
                        className="h-full rounded-lg object-cover opacity-65"
                    />
                    <span className='z-10 bg-white/75 py-2 text-black'>
                        Bild ändern
                    </span>
                </div>
            </ResponsiveDialogTrigger>
        )
    }

    return (
        <ResponsiveDialogTrigger asChild>
            <Button variant={'outline'}>
                <UploadIcon size={16} className="mr-2" />
                <span>Titelbild auswählen</span>
            </Button>
        </ResponsiveDialogTrigger>
    )
}
