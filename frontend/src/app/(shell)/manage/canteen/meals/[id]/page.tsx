import MealEditor from '@/features/canteen/components/ManageMeal/MealEditor'
import { canteenApi } from '@/lib/api/api'

interface Props {
    params: {
        id: string;
    };
}

const ManageMealPage = async (props: Props) => {
    const meal = await canteenApi.dishShow({dish: parseInt(props.params.id)})
    
    return (
        <MealEditor meal={meal}/>
    )
}

export default ManageMealPage