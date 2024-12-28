import {PostContext, PostContextProps} from '@/features/posts/contexts'
import {useContext} from 'react'

export function usePost<T>() {
    const context = useContext(PostContext)
    if (!context) {
        throw new Error('usePost must be used within a PostProvider')
    }
    return context as PostContextProps<T>
}
