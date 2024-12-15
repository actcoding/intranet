import {isBefore} from 'date-fns'
import {DateTimeFormatOptions} from 'use-intl'
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

export const allowedFileTypes = {
    headerImage: ['png', 'jpeg', 'jpg'],
}

export const createDraftFormSchema = z.object({
    title: z.string().min(1),
    type: z.enum(['news', 'event']),
})

export const eventDateTimeRangeConfig: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
}
