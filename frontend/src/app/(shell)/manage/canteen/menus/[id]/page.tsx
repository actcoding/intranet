import {ManageMenu} from '@/features/canteen/components/ManageMenu'
import {canteenApi} from '@/lib/api/api'
import {BackButton} from '@/shared/components/BackButton'

interface ManageMenuPageProps {
    params: {
        id: number;
    }
}

const ManageMenuPage = async ({params}: ManageMenuPageProps) => {
    const menu = await canteenApi.menuShow({menu: params.id})

    return (
        <>
            <BackButton href={'/manage/canteen/menus'}>Zur Menü-Übersicht</BackButton>
            <ManageMenu menu={menu} />
        </>
    )
}

export default ManageMenuPage
