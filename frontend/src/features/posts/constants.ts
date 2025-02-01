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
        message: 'Das Startdatum muss vor dem Enddatum liegen',
        path: ['startingAt'],
    })
    .refine((data) => isBefore(data.startingAt, data.endingAt), {
        message: 'Das Enddatum muss nach dem Startdatum liegen',
        path: ['endingAt'],
    })

export const allowedFileTypes = {
    headerImage: ['png', 'jpeg', 'jpg'],
}

export const createDraftFormSchema = z.object({
    title: z.string().min(1),
    type: z.enum(['news', 'event']),
})

export const linkPostFormSchema = z.object({
    postId: z.string(),
})

export const eventDateTimeRangeConfig: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
}
