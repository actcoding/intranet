'use client'

import { EventResource } from '@/lib/api/generated'
import { createContext, PropsWithChildren, useContext, useMemo } from 'react'

export type EventContext = {
    event: EventResource
}

const Context = createContext({} as EventContext)

type Props = PropsWithChildren<EventContext>

export default function NewsProvider({ event, children }: Props) {
    const context = useMemo<EventContext>(() => ({ event }), [event])

    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    )
}

export function useEvent(): EventResource {
    const { event } = useContext(Context)
    return event
}
