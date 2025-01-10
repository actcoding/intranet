import {MealNoteFormValues} from '@/features/canteen/types'
import {useFormContext} from 'react-hook-form'

const useMealNoteForm = () => {
    return useFormContext<MealNoteFormValues>()
}

export { useMealNoteForm }
