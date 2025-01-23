import {MenuPlanResource} from '@/lib/api/generated'
import {SlideUpAnimation} from '@/shared/components/SlideUpAnimation'
import MenuCard from './components/MenuCard'

interface MenuCardGridProps {
    menuList: MenuPlanResource[]
    className?: string
}

const MenuCardGrid = ({menuList, className} : MenuCardGridProps) => {
    return <div className={className}>
        {menuList.length === 0 ?
            <h1 className='flex justify-center'>Für diesen Tag wurden noch keine Menüs festgelegt</h1>
            : <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {menuList.map((plan: MenuPlanResource) =>
                    <SlideUpAnimation key={plan.id}>
                        <MenuCard
                            menuPlan={plan}
                        />
                    </SlideUpAnimation>,
                )}
            </div>}
    </div>
}

export default MenuCardGrid
