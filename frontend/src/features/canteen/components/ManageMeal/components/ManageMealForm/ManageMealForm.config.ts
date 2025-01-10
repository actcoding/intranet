import {DishUpdateRequestTypeEnum} from '@/lib/api/generated'
import * as z from 'zod'

export const mealFormSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    summary: z.string().min(1, 'Summary is required'),
    type: z.nativeEnum(DishUpdateRequestTypeEnum),
})

export type MealFormValues = Zod.infer<typeof mealFormSchema>

