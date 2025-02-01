import {AddLinkedDishDialog, ManageMenuDetails, ManageMenuMealCard} from '@/features/canteen/components/ManageMenu'
import {MenuResource} from '@/lib/api/generated'

interface ManageMenuProps {
    menu: MenuResource;
}

const ManageMenu = ({menu}: ManageMenuProps) => {
    return (
        <div className="flex gap-5">
            <div className="flex-1">
                <h1 className="mb-4 text-4xl font-semibold">{`${menu.name} bearbeiten`}</h1>
                <div className="grid gap-3 md:grid-cols-3">
                    {menu.dishes?.map((meal: any, index: number) => (
                        <ManageMenuMealCard meal={meal} key={index} menu={menu} />
                    ))}
                    <AddLinkedDishDialog menu={menu}/>
                </div>
            </div>
            <ManageMenuDetails menu={menu} />
        </div>
    )
}

export {ManageMenu}
