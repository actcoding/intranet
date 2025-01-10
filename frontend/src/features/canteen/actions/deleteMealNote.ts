'use server'

import { canteenApi } from '@/lib/api/api'
import { IngredientDestroyRequest } from '@/lib/api/generated'

const deleteMealNote = (request: IngredientDestroyRequest) => {
    return canteenApi.ingredientDestroy(request)
}

export { deleteMealNote }
