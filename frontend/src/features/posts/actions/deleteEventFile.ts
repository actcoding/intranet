'use server'

import { eventApi } from '@/lib/api/api'

export async function deleteEventFile(id: number, attachment: number) {
    await eventApi.eventUploadDelete({
        id,
        attachment,
    })
}
