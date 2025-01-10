'use client'

import IngredientBadges from '@/features/canteen/components/ManageMeals/components/IngredientBadges'
import {DishResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {Button} from '@/lib/components/common/Button'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'
import {PencilIcon} from 'lucide-react'
import Link from 'next/link'
import MealDeleteButton from './components/MealDeleteButton'

interface ManageMealCardProps {
    dish: DishResource
}

const ManageMealCard = ({dish} : ManageMealCardProps) => {
    return (
        <Card className="flex h-full flex-col">
            <CardHeader>
                <CardTitle>
                    <div className='flex flex-row justify-between'>
                        <p>{dish.name}</p>
                        {dish.lowCarb ? <Badge variant="secondary">Low Carb</Badge> : null}
                    </div>
                    <Badge className="mt-2 self-start">
                        {dish.type === 'main' ? 'Hauptgericht' : 'Dessert'}
                    </Badge>
                </CardTitle>
                <CardDescription>{dish.summary}</CardDescription>
            </CardHeader>
            <CardContent className='grow'>
                <IngredientBadges ingredients={dish.notes ?? []}/>
            </CardContent>
            <CardFooter className="mt-auto gap-2">
                <Button className="flex-1" variant="outline" asChild>
                    <Link href={`/manage/canteen/meals/${dish.id}`}>
                        <PencilIcon size={16} className="mr-2"/>
                        Bearbeiten
                    </Link>
                </Button>
                <MealDeleteButton dishId={dish.id}/>
            </CardFooter>
        </Card>
    )
}

export default ManageMealCard
