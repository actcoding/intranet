'use client'

import {EditLinkedPostsDialogFormField} from '@/features/posts/components/EditLinkedPosts'
import {EditLinkedPostsFormProvider} from '@/features/posts/contexts'
import {LinkPostFormValues, Post} from '@/features/posts/types'
import {Alert} from '@/lib/components/common/Alert'
import {Button} from '@/lib/components/common/Button'
import {Input} from '@/lib/components/common/Input'
import {
    ResponsiveDialog,
    ResponsiveDialogBody,
    ResponsiveDialogContent,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
} from '@/lib/components/common/ResponsiveDialog'
import {FormSubmitButton} from '@/shared/components/FormSubmitButton'
import {ScrollArea} from '@/shared/components/ScrollArea'
import {Link2Icon, LinkIcon, SearchIcon} from 'lucide-react'
import React, {ChangeEvent, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

interface EditLinkedPostsDialogProps {
    post: Post;
    onSearch: (query: string) => Promise<Post[]>;
    onSubmit: (values: LinkPostFormValues) => void;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    triggerButtonLabel?: string;
}

const EditLinkedPostsDialog = ({post, onSearch, onSubmit, open, onOpenChange, triggerButtonLabel}: EditLinkedPostsDialogProps) => {
    const [searchResults, setSearchResults] = useState<Post[] | undefined>(undefined)

    const handleSearchInputChange =
        useDebounceCallback(async (event: ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value
            const res = await onSearch(query)
            setSearchResults(res)
        }, 1000)

    return (
        <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
            <ResponsiveDialogTrigger asChild>
                <Button variant={'outline'}>
                    <LinkIcon className="mr-2" size={16} />
                    {triggerButtonLabel ?? 'Post verknüpfen'}
                </Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <EditLinkedPostsFormProvider post={post} onSubmit={onSubmit}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Post auswählen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody>
                        <div className="relative mb-3">
                            <Input placeholder="Suche nach Post" type="search" className="pl-8" onChange={handleSearchInputChange}
                            />
                            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </div>
                        {!searchResults ? <Alert>Tippen, um mit der Suche zu beginnen</Alert> : searchResults.length === 0 ? <Alert>Keine Ergebnisse</Alert> :
                            <ScrollArea className="h-[500px]">
                                <EditLinkedPostsDialogFormField items={searchResults} />
                            </ScrollArea>}
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>
                            <Link2Icon className="mr-2" size={16} />
                            <span>Verknüpfen</span>
                        </FormSubmitButton>
                    </ResponsiveDialogFooter>
                </EditLinkedPostsFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}

export { EditLinkedPostsDialog }
