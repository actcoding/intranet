import {MenuStoreRequestNutritionEnum, MenuUpdateRequestNutritionEnum} from '@/lib/api/generated'
import * as z from 'zod'

export const mealNoteFormSchema = z.object({
    name: z.string().min(1),
    type: z.enum(['allergen', 'additive']),
})

export const menuFormSchema = z.object({
    name: z.string().min(1),
    nutrition: z.nativeEnum(MenuStoreRequestNutritionEnum || MenuUpdateRequestNutritionEnum),
    defaultPrice: z.coerce.number().min(0),
})

export const linkDishFormSchema = z.object({
    dishId: z.coerce.number(),
})

export const linkMenuFormSchema = z.object({
    menuId: z.coerce.number(),
    price: z.coerce.number().min(0),
})

export const editPriceFormSchema = z.object({
    price: z.coerce.number().min(0),
})

export const servedAtDateFormat = 'yyyy-MM-dd'
