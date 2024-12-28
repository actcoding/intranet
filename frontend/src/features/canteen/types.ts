import {menuFormSchema} from '@/features/canteen/constants'
import * as z from 'zod'

export type MenuFormValues = z.infer<typeof menuFormSchema>
