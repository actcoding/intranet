import { EventContext } from '@/features/posts/contexts/EventContext'
import { useContext } from 'react'

export const useEvent = () => {
    const context = useContext(EventContext)
    if (!context) {
        throw new Error('useEvent must be used within an EventProvider')
    }
    return context
}
