'use server'

import { canteenApi } from '@/lib/api/api'
import { IngredientUpdateOperationRequest} from '@/lib/api/generated'

const updateMealNote = (request: IngredientUpdateOperationRequest) => {
    console.log('updated: ' + request)
    // return notesApi.updateNote(request)
    return canteenApi.ingredientUpdate(request)
}

export { updateMealNote }
