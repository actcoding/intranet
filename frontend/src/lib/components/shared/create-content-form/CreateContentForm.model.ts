import { createContentFormSchema } from '@/lib/components/shared/create-content-form/CreateContentForm.config'
import { UseFormReturn } from 'react-hook-form'
import * as z from 'zod'

export type CreateContentFormSchema = z.infer<typeof createContentFormSchema>

export type CreateContentForm = UseFormReturn<CreateContentFormSchema>
