import {DishResource} from '@/lib/api/generated'
import {CreateMealDialog} from './components/CreateMealDialog/CreateMealDialog'
import ManageMealCard from './components/ManageMealCard/ManageMealCard'

interface ManageMealsProps {
    dishes: DishResource[]
}

const ManageMeals = ({dishes}: ManageMealsProps) => {
    return (
        <>
            <div className='float-end space-x-2'>
                <CreateMealDialog />
            </div>
            <h1 className="mb-4 flex-1 text-4xl font-semibold">Gerichte</h1>
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
