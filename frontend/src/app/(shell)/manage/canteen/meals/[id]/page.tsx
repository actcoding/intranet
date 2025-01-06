import ManageMeal from '@/features/canteen/components/ManageMeal/ManageMeal'
import { canteenApi } from '@/lib/api/api'

interface Props {
    params: {
        id: string;
    };
}

const ManageMealPage = async (props: Props) => {
    const meal = await canteenApi.dishShow({dish: parseInt(props.params.id)})
    
    return (
        <ManageMeal meal={meal}/>
    )
}

export default ManageMealPage