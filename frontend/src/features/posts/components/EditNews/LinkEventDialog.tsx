'use client'

import {searchEvent} from '@/features/posts/actions'
import {LinkPostDialog} from '@/features/posts/components/LinkPostDialog/LinkPostDialog'
import {News} from '@/features/posts/types'

interface LinkEventDialogProps {
    news: News;
}

export const LinkEventDialog = ({news}: LinkEventDialogProps) => {
    const handleSearch = async (query: string) => {
        return await searchEvent({query})
    }
    return (
        <LinkPostDialog post={news} onSearch={handleSearch} />
    )
}
