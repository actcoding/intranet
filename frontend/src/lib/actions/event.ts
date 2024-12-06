'use server'

import { eventApi } from '@/lib/api/api'
import { EventUpdateOperationRequest } from '@/lib/api/generated'

export async function editEventAction(request: EventUpdateOperationRequest) {
    return eventApi.eventUpdate(request)
}

export async function restoreEventAction(id: number) {
    return eventApi.eventRestore({ id })
}

export async function deleteEventAction(id: number, force: boolean = false) {
    return eventApi.eventDestroy({ id, force })
}

export async function getEventListAction({
    page,
    perPage,
    year,
    month,
}: {
    page: number;
    perPage: number;
    year ?: number;
    month ?: number;
}) {
    const eventList = await eventApi.eventIndex({ page, perPage, status: 'active' , month, year})
    return eventList.data
}