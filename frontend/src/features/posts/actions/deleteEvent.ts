'use server'

import {eventApi} from '@/lib/api/api'
import {EventDestroyRequest} from '@/lib/api/generated'

export const deleteEvent = async (request: EventDestroyRequest) => {
    return eventApi.eventDestroy(request)
}
