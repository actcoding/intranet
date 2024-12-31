'use client'

import React, {createContext} from 'react'

export interface PostContextProps<T> {
    post: T;
}

export const PostContext = createContext<PostContextProps<any> | undefined>(
    undefined,
)

interface PostProviderProps<T> {
    post: T;
    children: React.ReactNode;
}

const PostProvider = <T,>({ post, children }: PostProviderProps<T>) => {
    return (
        <PostContext.Provider value={{ post }}>
            {children}
        </PostContext.Provider>
    )
}

export { PostProvider }
