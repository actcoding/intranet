'use server'

import {canteenApi} from '@/lib/api/api'
import {MenuDestroyRequest} from '@/lib/api/generated'

const deleteMenu = (request: MenuDestroyRequest) => {
    return canteenApi.menuDestroy(request)
}

export { deleteMenu }
