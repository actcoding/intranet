import MenuCard from './components/MenuCard'
import { MenuPlanResource } from '@/lib/api/generated'

interface CanteenPlanDailyMenuProps {
    menuList: MenuPlanResource[]
    className?: string
}

const CanteenPlanDailyMenu = ({menuList, className} : CanteenPlanDailyMenuProps) => {
    return <div className={className}>
        {menuList.length === 0 ? 
            <h1 className='flex justify-center'>Für diesen Tag wurden noch keine Menüs festgelegt</h1>
            : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuList.map((plan: MenuPlanResource) =>
                    <MenuCard key={plan.id} 
                        menuPlan={plan}
                    />,
                )}
            </div>}
    </div>
}

export default CanteenPlanDailyMenu