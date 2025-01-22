import {LinkMenuFormValues} from '@/features/canteen/types'
import {useFormContext} from 'react-hook-form'

const useLinkMenuForm = () => {
    return useFormContext<LinkMenuFormValues>()
}

export { useLinkMenuForm }
