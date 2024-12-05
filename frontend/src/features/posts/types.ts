import {
    createDraftFormSchema,
    eventFormSchema,
} from '@/features/posts/constants'
import { AttachmentResource, EventResource } from '@/lib/api/generated'
import * as z from 'zod'

export type EventFormValues = z.infer<typeof eventFormSchema>

export type Event = EventResource & {
    headerImage?: AttachmentResource;
    attachments?: AttachmentResource[];
}

export type CreateDraftFormValues = z.infer<typeof createDraftFormSchema>
