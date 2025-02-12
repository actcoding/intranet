import { EventFormValues } from '@/features/posts/types'
import { EventUpdateOperationRequest } from '@/lib/api/generated'

export const buildUpdateEventRequest = (
    id: number,
    eventUpdateRequest: EventFormValues,
): EventUpdateOperationRequest => {
    return {
        id,
        eventUpdateRequest,
    }
}
