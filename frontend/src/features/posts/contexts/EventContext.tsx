'use client'

import { Event } from '@/features/posts/types'
import React, { createContext } from 'react'

interface EventContextProps {
    event: Event;
}

export const EventContext = createContext<EventContextProps | undefined>(
    undefined,
)

interface EventProviderProps {
    event: Event;
    children: React.ReactNode;
}
export const EventProvider = ({ event, children }: EventProviderProps) => {
    return (
        <EventContext.Provider value={{ event }}>
            {children}
        </EventContext.Provider>
    )
}
