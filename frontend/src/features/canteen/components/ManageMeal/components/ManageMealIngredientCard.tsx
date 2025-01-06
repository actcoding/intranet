'use client'

import { IngredientResource } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'
import { Button } from '@/lib/components/common/Button'
import { Card, CardFooter, CardHeader, CardTitle } from '@/lib/components/common/Card'
import { CircleMinusIcon } from 'lucide-react'

interface ManageMealIngredientCardProps {
    ingredient: IngredientResource
}

const ManageMealIngredientCard = ({ingredient}: ManageMealIngredientCardProps) => {

    return (
        <Card>
            <CardHeader className="flex-1">
                <CardTitle>
                    <div className='flex'>
                        <p className='flex-1'>{ingredient.name}</p>
                        <Badge>{ingredient.type}</Badge>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardFooter className="gap-2">
                <Button variant="destructive" size="icon" onClick={() => console.log('unlink this ingredient')}>
                    <CircleMinusIcon size={16}/>
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ManageMealIngredientCard