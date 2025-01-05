import { DishResource } from '@/lib/api/generated'

interface ManageMealProps {
    meal: DishResource
}

const ManageMeal = ({meal}: ManageMealProps) => {
    return (
        <>
            <h1 className="mb-4 text-4xl font-semibold">{`${meal.name} bearbeiten`}</h1>
        </>
    )
}

export default ManageMeal