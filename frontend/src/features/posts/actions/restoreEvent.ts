'use server'

import {eventApi} from '@/lib/api/api'
import {EventRestoreRequest} from '@/lib/api/generated'

export const restoreEvent = async (request: EventRestoreRequest) => {
    return eventApi.eventRestore(request)
}
