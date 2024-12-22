'use client'

import {SelectPostFormField} from '@/features/posts/components/LinkPostDialog/SelectPostFormField'
import {LinkPostFormProvider} from '@/features/posts/contexts'
import {Post} from '@/features/posts/types'
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
import {Link2Icon, SearchIcon} from 'lucide-react'
import React, {ChangeEvent, useState} from 'react'
import {useDebounceCallback} from 'usehooks-ts'

interface LinkPostDialogProps {
    post: Post;
    onSearch: (query: string) => Promise<Post[]>;
}

export const LinkPostDialog = ({post, onSearch}: LinkPostDialogProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchResults, setSearchResults] = useState<Post[] | undefined>(undefined)

    const handleSearchInputChange =
        useDebounceCallback(async (event: ChangeEvent<HTMLInputElement>) => {
            const query = event.target.value
            const res = await onSearch(query)
            setSearchResults(res)
        }, 1000)

    return (
        <ResponsiveDialog open={isOpen} onOpenChange={setIsOpen}>
            <ResponsiveDialogTrigger asChild>
                <Button>Veranstaltung verknüpfen</Button>
            </ResponsiveDialogTrigger>
            <ResponsiveDialogContent>
                <LinkPostFormProvider post={post} linkedPostType="event" onSuccess={() => setIsOpen(false)}>
                    <ResponsiveDialogHeader>
                        <ResponsiveDialogTitle>Veranstaltung auswählen</ResponsiveDialogTitle>
                    </ResponsiveDialogHeader>
                    <ResponsiveDialogBody>
                        <div className="relative mb-3">
                            <Input placeholder="Suche nach Veranstaltung" type="search" className="pl-8" onChange={handleSearchInputChange}
                            />
                            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                        </div>
                        {!searchResults ? <Alert>Tippen, um mit der Suche zu beginnen</Alert> : searchResults.length === 0 ? <Alert>Keine Ergebnisse</Alert> :
                            <ScrollArea className="h-[500px]">
                                <SelectPostFormField items={searchResults} />
                            </ScrollArea>}
                    </ResponsiveDialogBody>
                    <ResponsiveDialogFooter>
                        <FormSubmitButton>
                            <Link2Icon className="mr-2" size={16} />
                            <span>Verknüpfen</span>
                        </FormSubmitButton>
                    </ResponsiveDialogFooter>
                </LinkPostFormProvider>
            </ResponsiveDialogContent>
        </ResponsiveDialog>
    )
}
