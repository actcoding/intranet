import { DishResource } from '@/lib/api/generated'
import ManageMealIngredientCard from './components/ManageMealIngredientCard'
import ManageMealForm from './components/ManageMealForm/ManageMealForm'

interface ManageMealProps {
    meal: DishResource
}

const ManageMeal = ({meal}: ManageMealProps) => {
    return (
        <>
            <h1 className="mb-4 text-4xl font-semibold">{`${meal.name} bearbeiten`}</h1>
            <div className='grid grid-cols-1 items-start gap-3 md:grid-cols-3'>
                <ManageMealForm meal={meal}/>
                <div className='grid gap-3 md:col-span-2 md:grid-cols-3'>
                    {meal.notes?.map((ingredient) => (
                        <ManageMealIngredientCard key={ingredient.id} ingredient={ingredient} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ManageMeal