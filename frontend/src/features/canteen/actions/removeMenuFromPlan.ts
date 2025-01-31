import {canteenApi} from '@/lib/api/api'
import {PlanUnserveRequest} from '@/lib/api/generated'

export const removeMenuFromPlan = (request: PlanUnserveRequest) => {
    return canteenApi.planUnserve(request)
}
