import * as z from 'zod'

export const mealNoteFormSchema = z.object({
    name: z.string().min(1),
    type: z.enum(['allergen', 'additive']),
})
