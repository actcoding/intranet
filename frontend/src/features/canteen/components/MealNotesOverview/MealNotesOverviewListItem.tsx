import {DeleteMealNoteDialog, EditMealNoteDialog} from '@/features/canteen/components/MealNotesOverview'
import {Badge} from '@/lib/components/common/Badge'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/lib/components/common/Card'

interface MealNotesOverviewListItemProps {
    note: any;
}

export const MealNotesOverviewListItem = ({note}: MealNotesOverviewListItemProps) => {
    return (
        <Card>
            <CardHeader className="flex-1">
                <CardTitle>{note.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <Badge variant="secondary">
                    {note.type === 'allergen' ? 'Allergen' : 'Zusatzstoff'}
                </Badge>
            </CardContent>
            <CardFooter className="gap-2">
                <EditMealNoteDialog note={note} />
                <DeleteMealNoteDialog note={note} />
            </CardFooter>
        </Card>
    )
}
