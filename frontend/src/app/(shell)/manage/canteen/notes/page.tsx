import {MealNotesOverview} from '@/features/canteen/components/MealNotesOverview'
import { canteenApi } from '@/lib/api/api'

const MealNotesOverviewPage = async () => {
    const notes = await canteenApi.ingredientIndex()

    return (
        <MealNotesOverview notes={notes} />
    )
}

export default MealNotesOverviewPage
