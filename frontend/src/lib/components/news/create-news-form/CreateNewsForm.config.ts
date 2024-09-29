import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

export const createNewsFormSchema = z.object({
    title: z.string(),
    content: z.string(),
})

export type CreateNewsForm = UseFormReturn<
    Zod.infer<typeof createNewsFormSchema>
>

export const editNewsFormSchema = createNewsFormSchema

export const allowedFileTypes = {
    headerImage: ['png', 'jpeg', 'jpg'],
}
