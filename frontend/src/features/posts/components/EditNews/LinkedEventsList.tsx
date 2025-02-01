'use client'

import {linkNewsAndEvent, unlinkNewsAndEvent} from '@/features/posts/actions'
import {EditLinkedPostsItem} from '@/features/posts/components/EditLinkedPosts'
import {usePost} from '@/features/posts/hooks'
import {News, Post} from '@/features/posts/types'
import {ToastAction} from '@/lib/components/common/Toast'
import {useToast} from '@/lib/components/hooks/use-toast'
import {useRouter} from 'next/navigation'

const LinkedEventsList = () => {
    const { post: news } = usePost<News>()
    const {toast} = useToast()
    const {refresh} = useRouter()

    const handleUnlink = async (event: Post) => {
        try {
            await unlinkNewsAndEvent({news: news.id, event: event.id})
            toast({description: `Verknüpfung mit "${event.title}" aufgehoben`, action: <ToastAction altText={'Verknüpfung aufheben'} onClick={() => handleLink(event)}>Rückgängig</ToastAction>})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Aufheben der Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    const handleLink = async (event: Post) => {
        try {
            await linkNewsAndEvent({attachRequest: {newsId: news.id, eventId: event.id}})
            toast({description: 'Verknüpfung wiederhergestellt'})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    return (news.linkedEvents?.map((event) => (
        <EditLinkedPostsItem key={event.id} post={event} href={`/events/${event.id}`} onUnlink={(event) => handleUnlink(event)} />
    )))
}

export { LinkedEventsList }
