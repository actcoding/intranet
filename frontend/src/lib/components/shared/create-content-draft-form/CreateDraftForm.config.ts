import * as z from 'zod'

export const createDraftFormSchema = z.object({
    title: z.string().min(1),
    type: z.enum(['news', 'event']),
})
