import {LinkDishFormValues} from '@/features/canteen/types'
import {useFormContext} from 'react-hook-form'

const useLinkDishForm = () => {
    return useFormContext<LinkDishFormValues>()
}

export { useLinkDishForm }
