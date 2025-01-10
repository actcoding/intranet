'use server'

import {canteenApi} from '@/lib/api/api'
import {MenuUpdateOperationRequest} from '@/lib/api/generated'

const updateMenu = (request: MenuUpdateOperationRequest) => {
    return canteenApi.menuUpdate(request)
}

export { updateMenu }
