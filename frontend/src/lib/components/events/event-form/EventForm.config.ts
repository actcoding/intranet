import { isBefore } from 'date-fns'
import * as z from 'zod'

export const eventFormSchema = z
    .object({
        title: z.string(),
        content: z.string(),
        starting_at: z.date(),
        ending_at: z.date(),
        isAllDay: z.boolean(),
    })
    .refine((data) => isBefore(data.starting_at, data.ending_at), {
        message: 'Ending date must not be earlier than starting date',
        path: ['starting_at', 'ending_at'],
    })

export type EventFormValues = z.infer<typeof eventFormSchema>

export const allowedFileTypes = {
    headerImage: ['png', 'jpeg', 'jpg'],
}
