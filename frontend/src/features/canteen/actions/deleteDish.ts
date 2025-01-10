'use server'

import {canteenApi} from '@/lib/api/api'
import {DishDestroyRequest} from '@/lib/api/generated'

const deleteDish = (request: DishDestroyRequest) => {
    return canteenApi.dishDestroy(request)
}

export { deleteDish }
