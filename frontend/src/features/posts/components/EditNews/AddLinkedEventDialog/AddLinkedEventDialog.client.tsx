'use client'

import {linkNewsAndEvent, searchEvent} from '@/features/posts/actions'
import {AddLinkedPostDialog} from '@/features/posts/components/EditLinkedPosts'
import {usePost} from '@/features/posts/hooks'
import {Event, LinkPostFormValues, News} from '@/features/posts/types'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

interface AddLinkedEventDialogClientProps {
    initialSearchResults?: Event[];
}

const AddLinkedEventDialogClient = ({initialSearchResults}: AddLinkedEventDialogClientProps) => {
    const {refresh} = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const {post: news} = usePost<News>()

    const handleSearch = async (query: string) => {
        return await searchEvent({query})
    }

    const handleSubmit = async (values: LinkPostFormValues) => {
        try {
            await linkNewsAndEvent({attachRequest: {newsId: news.id, eventId: Number(values.postId) }})
            refresh()
            setIsOpen(false)
        } catch (e) {
            console.error('Linking news and event failed:', e)
        }
    }

    return (
        <AddLinkedPostDialog post={news} onSearch={handleSearch} onSubmit={handleSubmit} open={isOpen} onOpenChange={setIsOpen} triggerButtonLabel={'Veranstaltung verknüpfen'} initialSearchResults={initialSearchResults}/>
    )
}

export { AddLinkedEventDialogClient }
