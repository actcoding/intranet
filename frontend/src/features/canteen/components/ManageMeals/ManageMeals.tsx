import { DishResource } from '@/lib/api/generated'
import ManageMealCard from './components/ManageMealCard/ManageMealCard'
import { CreateMealDialog } from './components/CreateMealDialog/CreateMealDialog'

interface ManageMealsProps {
    dishes: DishResource[]
}

const ManageMeals = ({dishes}: ManageMealsProps) => {
    return (
        <>
            <div className='flex gap-3'>
                <h1 className="mb-4 flex-1 text-4xl font-semibold">Gerichte</h1>
                <CreateMealDialog />
            </div>
            <div className='grid gap-3 md:grid-cols-3'>
                {dishes.map((dish) => (
                    <ManageMealCard 
                        key={dish.id}
                        dish={dish}    
                    />
                ))}
            </div>
        </>
    )
}

export {ManageMeals}