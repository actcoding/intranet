'use server'

import {canteenApi} from '@/lib/api/api'
import {MenuStoreOperationRequest} from '@/lib/api/generated'

const createMenu = (request: MenuStoreOperationRequest) => {
    return canteenApi.menuStore(request)
}

export { createMenu }
