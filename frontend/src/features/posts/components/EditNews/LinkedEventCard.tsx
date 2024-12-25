'use client'

import {linkNewsAndEvent, unlinkNewsAndEvent} from '@/features/posts/actions'
import {usePost} from '@/features/posts/hooks'
import {Event} from '@/features/posts/types'
import {Button} from '@/lib/components/common/Button'
import {Card} from '@/lib/components/common/Card'
import {ToastAction} from '@/lib/components/common/Toast'
import {useToast} from '@/lib/components/hooks/use-toast'
import {ExternalLinkIcon, UnlinkIcon} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

interface LinkedEventCardProps {
    event: Event
    showUnlink?: boolean
}

const LinkedEventCard = ({event, showUnlink}: LinkedEventCardProps) => {
    const {post} = usePost()
    const {toast} = useToast()
    const {refresh} = useRouter()

    const handleUnlink = async () => {
        try {
            await unlinkNewsAndEvent({news: post.id, event: event.id})
            toast({description: `Verknüpfung mit "${event.title}" aufgehoben`, action: <ToastAction altText={'Verknüpfung aufheben'} onClick={handleLink}>Rückgängig</ToastAction>})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Aufheben der Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    const handleLink = async () => {
        try {
            await linkNewsAndEvent({attachRequest: {newsId: post.id, eventId: event.id}})
            toast({description: 'Verknüpfung wiederhergestellt'})
            refresh()
        } catch (e) {
            console.log(e)
            toast({title: 'Fehler', description: 'Verknüpfung fehlgeschlagen', variant: 'destructive'})
        }
    }

    return (
        <Card className="flex flex-row items-center p-3">
            <span className="line-clamp-1 flex-1">{event.title}</span>
            <div className="ms-1 flex gap-1">
                <Button size="icon" variant="outline">
                    <Link href={`/events/${event.id}`} target="_blank">
                        <ExternalLinkIcon size={16} />
                    </Link>
                </Button>
                {showUnlink ? <Button onClick={handleUnlink} size="icon" variant="destructive">
                    <UnlinkIcon size={16} />
                    <span className="sr-only">Verknüpfung aufheben</span>
                </Button> : null}
            </div>
        </Card>
    )
}

export { LinkedEventCard }
