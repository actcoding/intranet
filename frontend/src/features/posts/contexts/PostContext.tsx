'use client'

import {Post} from '@/features/posts/types'
import React, {createContext} from 'react'

interface PostContextProps {
    post: Post;
}

export const PostContext = createContext<PostContextProps | undefined>(
    undefined,
)

interface PostProviderProps {
    post: Post;
    children: React.ReactNode;
}
export const PostProvider = ({ post, children }: PostProviderProps) => {
    return (
        <PostContext.Provider value={{ post }}>
            {children}
        </PostContext.Provider>
    )
}
