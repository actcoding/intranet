'use server'

import { format } from 'date-fns'
import { canteenApi } from '../api/api'
import {DishStoreOperationRequest, DishUpdateOperationRequest} from '../api/generated'

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

export async function updateDishAction(request: DishUpdateOperationRequest) {
    return canteenApi.dishUpdate(request)
}

export async function createDishAction(request: DishStoreOperationRequest) {
    return canteenApi.dishStore(request)
}
