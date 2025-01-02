import {mealNoteFormSchema} from '@/features/canteen/constants'
import * as z from 'zod'

export type MealNoteFormValues = z.infer<typeof mealNoteFormSchema>
