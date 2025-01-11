'use server'

import { eventApi } from '@/lib/api/api'
import { EventUpdateOperationRequest } from '@/lib/api/generated'

export const updateEvent = async (
    eventUpdateOperationRequest: EventUpdateOperationRequest,
) => {
    return eventApi.eventUpdate(eventUpdateOperationRequest)
}
