'use client'

import { AttachmentResourceData } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { Card } from '@/lib/components/common/Card'
import FileTypeIcon from '@/lib/components/shared/FileTypeIcon'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { DownloadIcon, Trash2Icon } from 'lucide-react'

interface FileListPreviewProps {
    files: File[] | AttachmentResourceData[];
    display?: 'list' | 'grid';
    download?: boolean
    onRemove?: (file: File | AttachmentResourceData) => void;
}

const FileListPreview = ({
    display = 'list',
    download,
    ...props
}: FileListPreviewProps) => {
    return (
        <ul>
            <AnimatePresence>
                {props.files.map((file) => (
                    <motion.li
                        key={file.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1 }}
                        layout
                        className={cn(display === 'grid' && 'inline-block')}
                    >
                        <Card
                            className={cn(
                                'flex flex-row items-center gap-x-2 mb-2 px-2 group',
                                props.onRemove && 'pr-0',
                            )}
                        >
                            <FileTypeIcon
                                fileType={file.type ?? 'text/plain'}
                                size={16}
                                className="shrink-0"
                            />
                            <span className="line-clamp-1 flex-1 py-2">
                                {file.name}
                            </span>
                            {download ? (
                                <DownloadIcon
                                    onClick={() => window.open(file.url, '_blank')}
                                    className='cursor-pointer'
                                />
                            ) : null}
                            {props.onRemove !== undefined ? (
                                <Button
                                    type="button"
                                    variant={'ghost'}
                                    size={'icon'}
                                    onClick={() =>
                                        props.onRemove && props.onRemove(file)
                                    }
                                >
                                    <Trash2Icon
                                        size={20}
                                        className="text-red-500"
                                    />
                                    <span className="sr-only">Remove</span>
                                </Button>
                            ) : null}
                        </Card>
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}
export default FileListPreview
