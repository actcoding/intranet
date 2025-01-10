import {IngredientResource} from '@/lib/api/generated'
import {Badge} from '@/lib/components/common/Badge'
import {PlusIcon, WheatIcon} from 'lucide-react'

interface IngredientBadgesProps {
    ingredients: IngredientResource[]
    className?: string
}

const IngredientBadges = ({ ingredients, className }: IngredientBadgesProps) => {
    return (
        <div className={className}>
            {ingredients.length > 0 ? (
                <div className='mb-2 space-x-1 space-y-1'>
                    {ingredients.map((note) => (
                        <Badge key={note.id}>
                            {note.type === 'allergen' ? <WheatIcon className="mr-1" size={16} /> : <PlusIcon className="mr-1" size={16} />}
                            {note.name}
                        </Badge>
                    ))}
                </div>
            ) : null}
        </div>
    )
}

export default IngredientBadges
