import {LinkMealDialog} from '@/features/canteen/components/ManageMenu'
import {MealCard} from '@/features/canteen/components/MealCard'

interface ManageMenuProps {
    menu: any;
}

const ManageMenu = ({menu}: ManageMenuProps) => {
    return (
        <>
            <h1 className="mb-4 text-4xl font-semibold">{`${menu.name} bearbeiten`}</h1>
            <div className="grid gap-3 md:grid-cols-3">
                {menu.meals.map((meal: any, index: number) => (
                    <MealCard meal={meal} key={index} />
                ))}
                <LinkMealDialog menu={menu} />
            </div>
        </>
    )
}

export {ManageMenu}
