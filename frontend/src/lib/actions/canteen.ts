'use server'
import { canteenApi } from '../api/api'
import { DishUpdateOperationRequest } from '../api/generated'

export async function deleteDishAction(id: number) {
    return canteenApi.dishDestroy({ dish:id })
}

export async function updateDishAction(request: DishUpdateOperationRequest) {
    return canteenApi.dishUpdate(request)
}