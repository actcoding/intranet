import { EventUpdateOperationRequest } from '@/lib/api/generated'
import { EventFormValues } from '@/lib/components/events/event-form/EventForm.config'
import { endOfDay, isEqual, startOfDay } from 'date-fns'

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

export const eventIsAllDay = (
    startingAt: Date | string,
    endingAt: Date | string,
) => {
    return (
        isEqual(startingAt, startOfDay(startingAt).setMilliseconds(0)) &&
        isEqual(endingAt, endOfDay(endingAt).setMilliseconds(0))
    )
}
