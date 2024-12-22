import {createDraftFormSchema, eventFormSchema, linkPostFormSchema} from '@/features/posts/constants'
import {AttachmentResource, EventResource, NewsResource} from '@/lib/api/generated'
import * as z from 'zod'

export type EventFormValues = z.infer<typeof eventFormSchema>

export type Event = EventResource & {
    attachments?: AttachmentResource[];
}

export type News = NewsResource & {
    attachments?: AttachmentResource[];
    headerImage?: AttachmentResource;
}

export type Post = News | Event

export type CreateDraftFormValues = z.infer<typeof createDraftFormSchema>

export type LinkPostFormValues = z.infer<typeof linkPostFormSchema>
