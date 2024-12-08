import { EventFormValues } from '@/features/posts/types'
import { EventUpdateOperationRequest } from '@/lib/api/generated'

export const buildUpdateEventRequest = (
    id: number,
    values: EventFormValues,
): EventUpdateOperationRequest => {
    return {
        id,
        eventUpdateRequest: {
            ...values,
            startingAt: values.startingAt.toISOString(),
            endingAt: values.endingAt.toISOString(),
        },
    }
}
