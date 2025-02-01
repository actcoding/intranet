'use client'

import {linkNewsAndEvent, searchNews} from '@/features/posts/actions'
import {AddLinkedPostDialog} from '@/features/posts/components/EditLinkedPosts/AddLinkedPostDialog/AddLinkedPostDialog'
import {usePost} from '@/features/posts/hooks'
import {Event, LinkPostFormValues, News} from '@/features/posts/types'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface AddLinkedNewsDialogClientProps {
    initialSearchResults?: News[];
}

const AddLinkedNewsDialogClient = ({initialSearchResults}: AddLinkedNewsDialogClientProps) => {
    const {refresh} = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const {post: event} = usePost<Event>()

    const handleSearch = async (query: string) => {
        return await searchNews({query})
    }

    const handleSubmit = async (values: LinkPostFormValues) => {
        try {
            await linkNewsAndEvent({attachRequest: {newsId: Number(values.postId), eventId: event.id }})
            refresh()
            setIsOpen(false)
        } catch (e) {
            console.error('Linking news and event failed:', e)
        }
    }

    return (
        <AddLinkedPostDialog post={event} onSearch={handleSearch} onSubmit={handleSubmit} open={isOpen} onOpenChange={setIsOpen} triggerButtonLabel={'Neuigkeit verknüpfen'} initialSearchResults={initialSearchResults} />
    )
}

export { AddLinkedNewsDialogClient }
