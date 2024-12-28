'use client'

import {linkNewsAndEvent, unlinkNewsAndEvent} from '@/features/posts/actions'
import {EditLinkedNewsDialog} from '@/features/posts/components/EditEvent'
import {EditLinkedPostsItem} from '@/features/posts/components/EditLinkedPosts'
import {usePost} from '@/features/posts/hooks'
import {Event, Post} from '@/features/posts/types'
import {ToastAction} from '@/lib/components/common/Toast'
import {useToast} from '@/lib/components/hooks/use-toast'
import {useRouter} from 'next/navigation'

const EditLinkedNews = () => {
    const { post: event } = usePost<Event>()
    const {toast} = useToast()
    const {refresh} = useRouter()

    const handleUnlink = async (news: Post) => {
        try {
            await unlinkNewsAndEvent({news: news.id, event: event.id})
            toast({description: `Verknüpfung mit "${event.title}" aufgehoben`, action: <ToastAction altText={'Verknüpfung aufheben'} onClick={() => handleLink(event)}>Rückgängig</ToastAction>})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Aufheben der Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    const handleLink = async (news: Post) => {
        try {
            await linkNewsAndEvent({attachRequest: {newsId: news.id, eventId: event.id}})
            toast({description: 'Verknüpfung wiederhergestellt'})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    return (
        <>
            <EditLinkedNewsDialog />
            {event.linkedNews?.map((news) => (
                <EditLinkedPostsItem key={news.id} post={news} href={`/news/${news.id}`} onUnlink={(news) => handleUnlink(news)} />
            ))}
        </>
    )
}

export { EditLinkedNews }
