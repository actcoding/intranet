import { ManageMeals } from '@/features/canteen/components/ManageMeals/ManageMeals'
import { canteenApi } from '@/lib/api/api'

const ManageMealsPage = async () => {
    
    const mealList = await canteenApi.dishIndex({perPage: '9'})
    
    return (
        <ManageMeals dishes={mealList.data} />
    )
}

export default ManageMealsPage