'use server'
import { canteenApi } from '../api/api'

export async function deleteDishAction(id: number) {
    return canteenApi.dishDestroy({ dish:id })
}