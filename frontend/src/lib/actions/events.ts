'use server'

import { ApiResult } from '@/lib/actions/news'
import { deserializeFileData } from '@/lib/utils'
import { eventApi } from '../api/api'
import {
    EventStoreRequest,
    EventUpdateOperationRequest,
    EventUploadTypeEnum,
    FetchError,
    ResponseError,
    UrlResource,
} from '../api/generated'

export const createEventAction = async (
    eventStoreRequest: EventStoreRequest,
) => {
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

export const updateEventAction = (
    eventUpdateOperationRequest: EventUpdateOperationRequest,
) => {
    return eventApi.eventUpdate(eventUpdateOperationRequest)
}

export async function uploadEventFileAction(
    id: number,
    type: EventUploadTypeEnum,
    formData: FormData,
): Promise<ApiResult<UrlResource | null>> {
    try {
        const fileData = deserializeFileData(formData)

        if (Array.isArray(fileData)) {
            for await (const file of fileData) {
                await eventApi.eventUpload({
                    id,
                    type,
                    file,
                })
            }
            return {
                data: null,
                error: null,
            }
        } else {
            const data = await eventApi.eventUpload({
                id,
                type,
                file: fileData,
            })
            return {
                data,
                error: null,
            }
        }
    } catch (error) {
        if (error instanceof ResponseError) {
            const data = await error.response.json()
            return {
                data: null,
                error: {
                    message: data.message,
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

export async function eventDetachFile(id: number, attachment: number) {
    await eventApi.eventUploadDelete({
        id,
        attachment,
    })
}
