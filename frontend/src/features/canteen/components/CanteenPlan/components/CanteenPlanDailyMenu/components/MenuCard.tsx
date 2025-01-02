import { DishResource, MenuPlanResource } from '@/lib/api/generated'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/lib/components/common/Card'
import { Dessert, UtensilsCrossedIcon } from 'lucide-react'
import IngredientBadges from './NoteBadges'

interface MenuCardProps {
    menuPlan: MenuPlanResource
}

const MenuCard = ({menuPlan}: MenuCardProps) => {
    const menu = menuPlan.menu 
    const dishes = menu.dishes ?? []
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                    <p className="text-xl">{menu.name}</p>
                    <p className="text-xl">{menuPlan.price + ' €'}</p>
                </CardTitle>
                <CardDescription className='text-lg'>
                    {menu.nutrition}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {dishes.map((dish: DishResource) => {
                    return (
                        <div key={dish.id} className="my-4 border-t pt-2">
                            <div className="mt-2 flex items-start">
                                {dish.type === 'dessert' ?
                                    <Dessert className="mr-2" />
                                    : <UtensilsCrossedIcon className="mr-2" />
                                }
                                <div>
                                    <p className="font-semibold">{dish.name}</p>
                                    <p className='text-muted-foreground'>{dish.summary}</p>
                                    <IngredientBadges 
                                        className="mt-4"
                                        ingredients={dish.notes ?? []}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
} 

export default MenuCard