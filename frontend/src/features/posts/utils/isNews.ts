import {Post} from '@/features/posts/types'

export const isNews = (post: Post) => {
    return 'he' in post
}
