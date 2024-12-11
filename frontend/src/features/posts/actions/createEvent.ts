'use server'

import { eventApi } from '@/lib/api/api'
import {
    EventStoreRequest,
    FetchError,
    ResponseError,
} from '@/lib/api/generated'

export const createEvent = async (eventStoreRequest: EventStoreRequest) => {
    try {
        const data = await eventApi.eventStore({
            eventStoreRequest,
        })

        return {
            data,
            error: null,
        }
    } catch (error) {
        console.error(error)
        if (error instanceof ResponseError || error instanceof FetchError) {
            return {
                data: null,
                error: {
                    message: error.message,
                },
            }
        }

        return {
            data: null,
            error: {
                //@ts-expect-error error is unknown
                message: error.message,
            },
        }
    }
}
