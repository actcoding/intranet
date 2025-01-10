import { MealFormValues } from '../components/ManageMeal/components/ManageMealForm/ManageMealForm.config'
import {useFormContext} from 'react-hook-form'

const useMealForm = () => {
    return useFormContext<MealFormValues>()
}

export { useMealForm }
