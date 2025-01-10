import {mealNoteFormSchema, linkDishFormSchema, menuFormSchema} from '@/features/canteen/constants'
import * as z from 'zod'

export type MealNoteFormValues = z.infer<typeof mealNoteFormSchema>

export type MenuFormValues = z.infer<typeof menuFormSchema>

export type LinkDishFormValues = z.infer<typeof linkDishFormSchema>
