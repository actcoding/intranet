import { IngredientResource } from '@/lib/api/generated'
import { Badge } from '@/lib/components/common/Badge'

interface IngredientBadgesProps {
    ingredients: IngredientResource[]
    className?: string
}

const IngredientBadges = ({ ingredients, className }: IngredientBadgesProps) => {
    const allergens = ingredients.filter(igredient => igredient.type === 'allergen')  
    const additives = ingredients.filter(igredient => igredient.type === 'additive')  
    return (
        <div className={className}>
            {allergens.length > 0 ? (
                <div className='mb-2'>
                    <p>Allergene:</p>
                    {allergens.map((note) => (
                        <Badge key={note.id}>{note.name}</Badge>
                    ))}
                </div>
            ) : null}
            {additives.length > 0 ? (
                <div>
                    <p>Zusatzstoffe:</p>
                    {additives.map((note) =>
                        <Badge key={note.id}>{note.name}</Badge>,
                    )}
                </div>
            ) : null}
            
        </div>
    )
}

export default IngredientBadges