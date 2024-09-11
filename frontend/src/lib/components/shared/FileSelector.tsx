'use client'

import { Button } from '@/lib/components/common/Button'
import { Input } from '@/lib/components/common/Input'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogClose,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import { useFileSelector } from '@/lib/components/hooks/use-file-selector'
import React, { createContext, useState } from 'react'

interface FileSelectorContextProps {
    selectedFilePreview: File[] | null;
    setSelectedFilePreview: (file: File[] | null) => void;
    dialogOpen: boolean;
    setDialogOpen: (open: boolean) => void;
    onChange?: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
}

export const FileSelectorContext = createContext<FileSelectorContextProps>({
    selectedFilePreview: null,
    setSelectedFilePreview: () => {},
    dialogOpen: false,
    setDialogOpen: () => {},
})

interface FileSelectorProps {
    children?: React.ReactNode;
    onChange?: (files: File[]) => void;
    onPreviewChange?: (files: File[] | null) => void;
    accept?: string;
    multiple?: boolean;
}

const FileSelector = React.forwardRef(
    (props: FileSelectorProps, ref: React.Ref<any>) => {
        const [selectedFilePreview, setSelectedFilePreview] = useState<
            File[] | null
        >(null)
        const [dialogOpen, setDialogOpen] = useState(false)

        function handleFilePreviewChange(file: File[] | null) {
            setSelectedFilePreview(file)
            props.onPreviewChange && props.onPreviewChange(file)
        }

        function handleDialogOpenChange(open: boolean) {
            setDialogOpen(open)
            if (!open) handleFilePreviewChange(null)
        }

        return (
            <FileSelectorContext.Provider
                value={{
                    selectedFilePreview,
                    setSelectedFilePreview: handleFilePreviewChange,
                    dialogOpen,
                    setDialogOpen: handleDialogOpenChange,
                    onChange: props.onChange,
                    accept: props.accept,
                    multiple: props.multiple,
                }}
            >
                <ResponsiveDialog
                    open={dialogOpen}
                    onOpenChange={handleDialogOpenChange}
                >
                    {props.children}
                </ResponsiveDialog>
            </FileSelectorContext.Provider>
        )
    },
)

FileSelector.displayName = 'FileSelector'

const FileSelectorTrigger = ResponsiveDialogTrigger

const FileSelectorContent = ResponsiveDialogContent

const FileSelectorHeader = ResponsiveDialogHeader

const FileSelectorTitle = ResponsiveDialogTitle

const FileSelectorDescription = ResponsiveDialogDescription

const FileSelectorBody = ResponsiveDialogBody

interface FileSelectorInputProps {}

const FileSelectorInput = (props: FileSelectorInputProps) => {
    const { setSelectedFilePreview, accept, multiple } = useFileSelector()

    return (
        <Input
            className="mb-2"
            onChange={(e) =>
                setSelectedFilePreview(
                    e.target.files && Array.from(e.target.files),
                )
            }
            type="file"
            accept={accept}
            multiple={multiple}
        />
    )
}

const FileSelectorFooter = () => {
    const { selectedFilePreview, setDialogOpen, onChange } = useFileSelector()

    function handleFileSelectionConfirm() {
        if (!selectedFilePreview) return
        onChange?.(selectedFilePreview)
        setDialogOpen(false)
    }

    return (
        <ResponsiveDialogFooter>
            <ResponsiveDialogClose asChild>
                <Button variant={'outline'}>Abbrechen</Button>
            </ResponsiveDialogClose>
            <Button
                onClick={() => {
                    handleFileSelectionConfirm()
                }}
                disabled={!selectedFilePreview}
            >
                Speichern
            </Button>
        </ResponsiveDialogFooter>
    )
}

export {
    FileSelector, FileSelectorBody, FileSelectorContent, FileSelectorDescription, FileSelectorFooter, FileSelectorHeader, FileSelectorInput, FileSelectorTitle, FileSelectorTrigger,
}
