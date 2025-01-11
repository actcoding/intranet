'use client'

import {updateMenu} from '@/features/canteen/actions'
import {DishResource, MenuResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {useToast} from '@/lib/components/hooks/use-toast'
import {CircleMinusIcon, PencilIcon, PlusIcon, WheatIcon} from 'lucide-react'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

interface ManageMenuMealCardProps {
    meal: DishResource;
    menu: MenuResource;
}

const ManageMenuMealCard = ({meal, menu}: ManageMenuMealCardProps) => {
    // TODO: maybe provide menu via context hook in the future

    const {refresh} = useRouter()
    const {toast} = useToast()

    const handleUnlink = async () => {
        try {
            const remainingDishIds = menu.dishes?.filter(dish => dish.id !== meal.id).map(dish => dish.id)
            await updateMenu({menu: menu.id, menuUpdateRequest: {dishes: remainingDishIds}})
            toast({
                title: 'Gericht entfernt',
                description: `Das Gericht "${meal.name}" wurde erfolgreich entfernt`,
            })
            refresh()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card className="flex">
            <div className="flex flex-1 flex-col">
                <CardHeader className="flex-1">
                    <CardTitle>{meal.name}</CardTitle>
                    <Badge className="self-start">
                        {meal.type === 'main' ? 'Hauptgericht' : 'Dessert'}
                    </Badge>
                    <CardDescription>{meal.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-x-1 space-y-2">
                    {meal.notes?.map((note: any, index: number) => (
                        <Badge key={index} variant="outline">
                            {note.type === 'allergen' ? <WheatIcon className="mr-1" size={12} /> : <PlusIcon className="mr-1" size={12} />}
                            {note.name}
                        </Badge>
                    ))}
                </CardContent>
                <CardFooter className="gap-2">
                    <Button asChild variant="outline" className="flex-1">
                        <Link href={`/manage/canteen/dishes/${meal.id}`}>
                            <PencilIcon size={16} className="mr-2"/>
                            Bearbeiten
                        </Link>
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleUnlink()}>
                        <CircleMinusIcon size={16}/>
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export { ManageMenuMealCard }
