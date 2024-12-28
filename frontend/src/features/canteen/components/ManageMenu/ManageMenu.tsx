import {LinkMealDialog, ManageMenuMealCard} from '@/features/canteen/components/ManageMenu'

interface ManageMenuProps {
    menu: any;
}

const ManageMenu = ({menu}: ManageMenuProps) => {

    return (
        <>
            {/* put another menuform here for editing */}
            <h1 className="mb-4 text-4xl font-semibold">{`${menu.name} bearbeiten`}</h1>
            <div className="grid gap-3 md:grid-cols-3">
                {menu.meals.map((meal: any, index: number) => (
                    <ManageMenuMealCard meal={meal} key={index} menu={menu} />
                ))}
                <LinkMealDialog menu={menu} />
            </div>
        </>
    )
}

export {ManageMenu}
