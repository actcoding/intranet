import {ManageMenus} from '@/features/canteen/components/ManageMenus'
import {canteenApi} from '@/lib/api/api'

const ManageMenusPage = async () => {
    const {data: menus} = await canteenApi.menuIndex()

    return (
        <ManageMenus menus={menus} />
    )
}

export default ManageMenusPage
