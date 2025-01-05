import { DishResource } from '@/lib/api/generated'
import ManageMealCard from './components/ManageMealCard/ManageMealCard'

interface ManageMealsProps {
    dishes: DishResource[]
}

const ManageMeals = ({dishes}: ManageMealsProps) => {
    return (
        <>
            <div>
                <h1 className="mb-4 text-4xl font-semibold">Gerichte</h1>
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