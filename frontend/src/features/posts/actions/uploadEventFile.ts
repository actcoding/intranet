'use server'

import { ApiResult } from '@/lib/actions/news'
import { eventApi } from '@/lib/api/api'
import {
    EventUploadTypeEnum,
    ResponseError,
    UrlResource,
} from '@/lib/api/generated'
import { deserializeFileData } from '@/lib/utils'

export async function uploadEventFile(
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
