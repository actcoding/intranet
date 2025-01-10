import {IngredientResource} from '@/lib/api/generated'
import {ComboboxForm} from './AddIngredientBox'
import ManageMealIngredientCard from './ManageMealIngredientCard'

interface IngredientListProps {
    ingredients: IngredientResource[]
    addIngredient: (ingredient:IngredientResource) => void
    deleteIngredient: (ingredientId: number) => void
}

const IngredientList = ({ingredients, addIngredient, deleteIngredient}: IngredientListProps) => {

    return (
        <div>
            <div className='flex pb-4'>
                <ComboboxForm
                    handleSubmit={addIngredient}
                />
            </div>
            <div className='grid gap-3 md:grid-cols-2'>
                {ingredients.map((ingredient) => (
                    <ManageMealIngredientCard
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleDelete={(id: number) => deleteIngredient(id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IngredientList
