import {ManageMenu} from '@/features/canteen/components/ManageMenu'
import {canteenApi} from '@/lib/api/api'

interface ManageMenuPageProps {
    params: {
        id: number;
    }
}

const ManageMenuPage = async ({params}: ManageMenuPageProps) => {
    const menu = await canteenApi.menuShow({menu: params.id})

    return (
        <ManageMenu menu={menu} />
    )
}

export default ManageMenuPage
