import MealEditor from '@/features/canteen/components/ManageMeal/MealEditor'
import {canteenApi} from '@/lib/api/api'
import {BackButton} from '@/shared/components/BackButton'

interface Props {
    params: {
        id: string;
    };
}

const ManageMealPage = async (props: Props) => {
    const meal = await canteenApi.dishShow({dish: parseInt(props.params.id)})

    return (
        <>
            <BackButton href={'/manage/canteen/dishes'}>Zur Gerichteübersicht</BackButton>
            <MealEditor meal={meal} />
        </>
    )
}

export default ManageMealPage
