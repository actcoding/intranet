import { MenuPlanResource } from '@/lib/api/generated'
import MenuItem from './MenuItem'

interface MenuListProps {
    menuPlanList: MenuPlanResource[]
}

const MenuList = ({menuPlanList}: MenuListProps) => {
    return (
        <div className='flex flex-col gap-2'>
            {menuPlanList.map((menuPlan) => (
                <MenuItem key={menuPlan.id} menuPlan={menuPlan} />
            ))}
        </div>
    )
}

export default MenuList