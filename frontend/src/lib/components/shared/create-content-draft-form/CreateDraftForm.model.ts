import { createDraftFormSchema } from '@/lib/components/shared/create-content-draft-form/CreateDraftForm.config'
import * as z from 'zod'

export type createDraftForm = z.infer<typeof createDraftFormSchema>
