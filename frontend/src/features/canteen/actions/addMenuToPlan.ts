'use server'

import {canteenApi} from '@/lib/api/api'
import {PlanServeRequest} from '@/lib/api/generated'

export const addMenuToPlan = (request: PlanServeRequest) => {
    return canteenApi.planServe(request)
}
