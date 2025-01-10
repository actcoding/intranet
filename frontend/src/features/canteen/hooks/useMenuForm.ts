import {MenuFormValues} from '@/features/canteen/types'
import {useFormContext} from 'react-hook-form'

const useMenuForm = () => {
    return useFormContext<MenuFormValues>()
}

export { useMenuForm }
