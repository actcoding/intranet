import {MealNotesOverview} from '@/features/canteen/components/MealNotesOverview'

const MealNotesOverviewPage = () => {
    const notes = [
        {
            id: 1,
            name: 'Enthält Nüsse',
            type: 'allergen',
        },
        {
            id: 2,
            name: 'Enthält Gluten',
            type: 'allergen',
        },
        {
            id: 3,
            name: 'Enthält Geschmacksverstärker',
            type: 'additive',
        },
    ]

    return (
        <MealNotesOverview notes={notes} />
    )
}

export default MealNotesOverviewPage
