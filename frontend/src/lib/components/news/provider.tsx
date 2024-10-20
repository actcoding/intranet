'use client'

import { NewsResource } from '@/lib/api/generated'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

export type NewsContext = {
    news: NewsResource
}

const Context = createContext({} as NewsContext)

type Props = PropsWithChildren<NewsContext>

export default function NewsProvider({ news, children }: Props) {
    const context = useMemo<NewsContext>(() => ({ news }), [news])

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useNews(): NewsResource {
    const { news } = useContext(Context)
    return news
}
