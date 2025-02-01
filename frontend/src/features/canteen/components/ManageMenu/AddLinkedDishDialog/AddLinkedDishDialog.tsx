import {
    AddLinkedDishDialogClient,
} from '@/features/canteen/components/ManageMenu/AddLinkedDishDialog/AddLinkedDishDialog.client'
import {canteenApi} from '@/lib/api/api'
import {MenuResource} from '@/lib/api/generated'

export interface AddLinkedDishDialogProps {
    menu: MenuResource;
}

export const AddLinkedDishDialog = async ({menu}: AddLinkedDishDialogProps) => {
    const {data} = await canteenApi.dishIndex({perPage: '10'})
    return (
        <AddLinkedDishDialogClient initialSearchResults={data} menu={menu} />
    )
}
