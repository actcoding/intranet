'use server'

import { eventApi } from '@/lib/api/api'
import { EventUpdateOperationRequest } from '@/lib/api/generated'

export const updateEvent = (
    eventUpdateOperationRequest: EventUpdateOperationRequest,
) => {
    return eventApi.eventUpdate(eventUpdateOperationRequest)
}
