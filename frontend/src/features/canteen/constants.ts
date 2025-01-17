import { MenuNutrition } from '@/lib/api/generated'
import * as z from 'zod'

export const mealNoteFormSchema = z.object({
    name: z.string().min(1),
    type: z.enum(['allergen', 'additive']),
})

export const menuFormSchema = z.object({
    name: z.string().min(1),
    nutrition: z.nativeEnum(MenuNutrition),
    defaultPrice: z.coerce.number().min(0).optional(),
})

export const linkDishFormSchema = z.object({
    dishId: z.coerce.number(),
})
