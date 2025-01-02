'use server'

import { format } from 'date-fns'
import { canteenApi } from '../api/api'

export async function getPlanListAction({
    from,
    to, 
} : {
    from: Date,
    to: Date,
}) {
    const result = await canteenApi.planList({
        from: format(from, 'yyyy-MM-dd'),
        to: format(to, 'yyyy-MM-dd'),
    })
    return result
}