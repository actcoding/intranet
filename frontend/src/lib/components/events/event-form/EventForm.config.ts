import { isBefore } from 'date-fns'
import * as z from 'zod'

export const eventFormSchema = z
    .object({
        title: z.string(),
        content: z.string(),
        startingAt: z.date(),
        endingAt: z.date(),
        isAllDay: z.boolean(),
    })
    .refine((data) => isBefore(data.startingAt, data.endingAt), {
        message: 'Ending date must not be earlier than starting date',
        path: ['starting_at', 'ending_at'],
    })

export type EventFormValues = z.infer<typeof eventFormSchema>

export const allowedFileTypes = {
    headerImage: ['png', 'jpeg', 'jpg'],
}
