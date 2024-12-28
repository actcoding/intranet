import * as z from 'zod'

export const menuFormSchema = z.object({
    name: z.string().min(1),
    nutrition: z.string().min(1),
    defaultPrice: z.number().min(0),
})
