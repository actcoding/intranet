import { DishResource, IngredientResource, MenuPlanResource } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'
import { Card, CardContent} from '@/lib/components/common/Card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/lib/components/common/HoverCard'
import { Dessert, Info, InfoIcon, UtensilsCrossedIcon } from 'lucide-react'
interface MenuItemProps {
    menuPlan: MenuPlanResource
}

const MenuItem = ({menuPlan}: MenuItemProps) => {
    const menu = menuPlan.menu
    const dishes = menu.dishes ?? []    
    return (
        <Card>
            <CardContent>
                <div className='flex flex-row justify-between pt-4'>
                    <p className='font-semibold'>{menu.name}</p>
                    <p className='font-semibold'>{menuPlan.price + ' €'}</p>
                </div>
                <div className='flex flex-row justify-between'>
                    <Badge>{menu.nutrition}</Badge>
                    <HoverCard>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger> 
                        <HoverCardContent>
                            {dishes.map((dish: DishResource) => {
                                return (
                                    <div key={dish.id} className="mt-2 flex flex-row justify-between">
                                        <div className="flex items-start">
                                            {dish.type === 'dessert' ?
                                                <Dessert className="mr-2"/>
                                                : 
                                                <UtensilsCrossedIcon className="mr-2"/>
                                            }
                                            <ul>
                                                {dish.notes?.map((note: IngredientResource) => (
                                                    <li key={note.id}>{note.name}</li>   
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )
                            })}
                        </HoverCardContent>
                    </HoverCard>
                </div>
                {dishes.map((dish: DishResource) => {
                    return (
                        <div key={dish.id} className="mt-2 flex flex-row justify-between">
                            <div className="flex items-start">
                                {dish.type === 'dessert' ?
                                    <Dessert className="mr-2"/>
                                    : 
                                    <UtensilsCrossedIcon className="mr-2"/>
                                }
                                <p>{dish.name}</p> 
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}

export default MenuItem