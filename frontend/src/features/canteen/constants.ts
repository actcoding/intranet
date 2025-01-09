import * as z from 'zod'

export const menuFormSchema = z.object({
    name: z.string().min(1),
    nutrition: z.enum(['omnivorous', 'vegetarian', 'vegan']),
    defaultPrice: z.coerce.number().min(0),
})
