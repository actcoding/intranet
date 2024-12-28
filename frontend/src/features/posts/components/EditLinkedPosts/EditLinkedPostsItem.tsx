'use client'

import {Post} from '@/features/posts/types'
import {Button} from '@/lib/components/common/Button'
import {Card} from '@/lib/components/common/Card'
import {ExternalLinkIcon, UnlinkIcon} from 'lucide-react'
import Link from 'next/link'

interface EditLinkedPostsItemProps {
    post: Post
    href: string
    onUnlink?: (post: Post) => void
}

const EditLinkedPostsItem = ({post, onUnlink, href}: EditLinkedPostsItemProps) => {
    return (
        <Card className="flex flex-row items-center p-3">
            <span className="line-clamp-1 flex-1">{post.title}</span>
            <div className="ms-1 flex gap-1">
                <Button size="icon" variant="outline" asChild>
                    <Link href={href} target="_blank">
                        <ExternalLinkIcon size={16} />
                    </Link>
                </Button>
                {onUnlink ? <Button onClick={() => onUnlink(post)} size="icon" variant="destructive">
                    <UnlinkIcon size={16} />
                    <span className="sr-only">Verknüpfung aufheben</span>
                </Button> : null}
            </div>
        </Card>
    )
}

export { EditLinkedPostsItem }
