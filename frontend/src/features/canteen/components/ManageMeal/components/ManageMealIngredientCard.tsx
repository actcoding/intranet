'use client'

import { IngredientResource } from '@/lib/api/generated'
import { Button } from '@/lib/components/common/Button'
import { Card, CardContent} from '@/lib/components/common/Card'
import { X } from 'lucide-react'

interface ManageMealIngredientCardProps {
    ingredient: IngredientResource
}

const ManageMealIngredientCard = ({ingredient}: ManageMealIngredientCardProps) => {

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <h3 className="mb-1 text-ellipsis text-lg font-semibold leading-none">
                        {ingredient.name}
                    </h3>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        onClick={() => console.log('Delink Ingredient:', ingredient.id)}
                        aria-label={`Remove ${ingredient.name}`}
                    >
                        <X className="size-4" />
                    </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                    {ingredient.type}
                </p>
            </CardContent>
        </Card>
    )
}

export default ManageMealIngredientCard