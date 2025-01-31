import {EditPriceFormValues} from '@/features/canteen/types'
import {useFormContext} from 'react-hook-form'

export const useEditPriceForm = () => {
    return useFormContext<EditPriceFormValues>()
}
