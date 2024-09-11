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
            <div className="flex flex-col items-center gap-2">
                <ResponsiveDialogTrigger>
                    <div className="relative rounded-lg bg-black">
                        <img
                            src={file.url}
                            alt={file.name}
                            className="rounded-lg opacity-50"
                        />
                        <span className='absolute inset-0 text-white'>
                            Bild ändern
                        </span>
                    </div>
                </ResponsiveDialogTrigger>
            </div>
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
