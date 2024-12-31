'use server'

import { canteenApi } from '@/lib/api/api'
import { IngredientStoreOperationRequest} from '@/lib/api/generated'


const createMealNote = (request: IngredientStoreOperationRequest) => {
    console.log('created: ' + request)
    return canteenApi.ingredientStore(request)
}

export { createMealNote }
