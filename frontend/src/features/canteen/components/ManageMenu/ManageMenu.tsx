import {EditLinkedDishesDialog, ManageMenuDetails, ManageMenuMealCard} from '@/features/canteen/components/ManageMenu'
import {MenuResource} from '@/lib/api/generated'
import {Separator} from '@/shared/components/Separator'

interface ManageMenuProps {
    menu: MenuResource;
}

const ManageMenu = ({menu}: ManageMenuProps) => {

    return (
        <>
            <div className="flex gap-3">
                <div className="flex-1">
                    <h1 className="mb-4 text-4xl font-semibold">{`${menu.name} bearbeiten`}</h1>
                    <div className="grid gap-3 md:grid-cols-3">
                        {menu.dishes?.map((meal: any, index: number) => (
                            <ManageMenuMealCard meal={meal} key={index} menu={menu} />
                        ))}
                        <EditLinkedDishesDialog menu={menu}/>
                    </div>
                </div>
                <Separator className="my-5 md:hidden" />
                <ManageMenuDetails menu={menu} />
            </div>
        </>
    )
}

export {ManageMenu}
