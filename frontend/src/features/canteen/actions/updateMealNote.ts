'use server'

import { canteenApi } from '@/lib/api/api'
import { IngredientUpdateOperationRequest} from '@/lib/api/generated'

const updateMealNote = (request: IngredientUpdateOperationRequest) => {
    return canteenApi.ingredientUpdate(request)
}

export { updateMealNote }
