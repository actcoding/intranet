import {CreateMealNoteDialog, MealNotesOverviewListItem} from '@/features/canteen/components/MealNotesOverview'

interface MealNotesOverviewProps {
    notes: any[];
}

export const MealNotesOverview = ({notes}: MealNotesOverviewProps) => {
    return (
        <>
            <div className="float-end space-x-2">
                <CreateMealNoteDialog />
            </div>
            <h1 className="mb-4 text-4xl font-semibold">Hinweise</h1>
            <div className="grid gap-3 md:grid-cols-3">
                {notes.map((note, index) => <MealNotesOverviewListItem key={index} note={note} />)}
            </div>
        </>
    )
}
