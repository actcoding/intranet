'use server'

import {eventApi} from '@/lib/api/api'

export const searchEvent = async ({query}: {query: string}) => {
    const {data} = await eventApi.eventIndex()
    return data.filter((event) => event.title.toLowerCase().includes(query.toLowerCase()))
}
