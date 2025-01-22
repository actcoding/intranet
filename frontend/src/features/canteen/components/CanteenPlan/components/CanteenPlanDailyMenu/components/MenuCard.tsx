import {DishResource, MenuPlanResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/lib/components/common/Card'
import IngredientBadges from '@/shared/components/IngredientBadges'
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/shared/components/Tooltip'
import {OctagonAlertIcon} from 'lucide-react'
import Image from 'next/image'

interface MenuCardProps {
    menuPlan: MenuPlanResource
}

const MenuCard = ({menuPlan}: MenuCardProps) => {
    const menu = menuPlan.menu
    const dishes = menu.dishes ?? []

    const updatedAtDate  = new Date(menuPlan.updatedAt)
    const servedAtDate = new Date(`${menuPlan.servedAt}T00:00:00Z`)
    const timeDifferenceMs = updatedAtDate.getTime() - servedAtDate.getTime()
    const timeDifferenceHours =  timeDifferenceMs / (1000 * 60 * 60)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex flex-row justify-between">
                    <p className="text-xl">{menu.name}</p>
                    <p className="text-xl">{menuPlan.price + ' €'}</p>
                </CardTitle>
                <div className='flex'>
                    <CardDescription className='flex-1 text-lg'>
                        {menu.nutrition === 'omnivorous' ? 'Mit Fleisch' : menu.nutrition === 'vegetarian' ? 'Vegetarisch' : 'Vegan'}
                    </CardDescription>
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
                </div>
            </CardHeader>
            <CardContent>
                {dishes.map((dish: DishResource) => {
                    return (
                        <div key={dish.id} className="my-4 border-t pt-2">
                            <div className="mt-2 flex">
                                <div className={'mr-4 flex size-16 items-center justify-center rounded-lg bg-primary/15'}>
                                    {dish.type === 'dessert' ?
                                        <Image src={'/cake.png'} width={45} height={45} alt=""/>
                                        :
                                        <Image src={'/noodle.png'} width={45} height={45} alt=""/>
                                    }
                                </div>
                                <div className='flex-1'>
                                    <div className='flex flex-row justify-between'>
                                        <p className="font-semibold">{dish.name}</p>
                                        {dish.lowCarb ? <Badge variant="secondary">Low Carb</Badge> : null}
                                    </div>
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
