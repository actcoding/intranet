import * as z from 'zod'

export const createContentFormSchema = z.object({
    title: z.string(),
    content: z.string(),
})
