import {DishResource, IngredientResource, MenuPlanResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Card, CardContent} from '@/lib/components/common/Card'
import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/lib/components/common/HoverCard'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/shared/components/Tooltip'
import {Dessert, InfoIcon, OctagonAlertIcon, UtensilsCrossedIcon} from 'lucide-react'

interface MenuItemProps {
    menuPlan: MenuPlanResource
}

const MenuItem = ({menuPlan}: MenuItemProps) => {
    const menu = menuPlan.menu
    const dishes = menu.dishes ?? []

    const updatedAtDate  = new Date(menuPlan.updatedAt)
    const servedAtDate = new Date(`${menuPlan.servedAt}T00:00:00Z`)
    const timeDifferenceMs = updatedAtDate.getTime() - servedAtDate.getTime()
    const timeDifferenceHours =  timeDifferenceMs / (1000 * 60 * 60)

    return (
        <Card>
            <CardContent>
                <div className='flex flex-row justify-between pt-4'>
                    <p className='font-semibold'>{menu.name}</p>
                    <p className='font-semibold'>{menuPlan.price + ' €'}</p>
                </div>
                <div className='flex'>
                    <div className='flex-1'>
                        <Badge>{menu.nutrition === 'omnivorous' ? 'Mit Fleisch' : menu.nutrition === 'vegetarian' ? 'Vegetarisch' : 'Vegan'}</Badge>
                    </div>
                    {(timeDifferenceHours < 24 && timeDifferenceHours >= 0) ?
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <OctagonAlertIcon color='red' className='mr-1'/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>aktuelles Update</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        : null
                    }

                    <HoverCard>
                        <HoverCardTrigger>
                            <InfoIcon />
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <p className='font-semibold'>Inhaltsstoffe:</p>
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
