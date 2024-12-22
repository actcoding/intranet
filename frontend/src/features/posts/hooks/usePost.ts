import {PostContext} from '@/features/posts/contexts/PostContext'
import {useContext} from 'react'

export const usePost = () => {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error('usePost must be used within an EventProvider')
    }
    return context
}
