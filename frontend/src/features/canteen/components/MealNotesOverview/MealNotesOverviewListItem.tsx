import {CreateOrEditMealNoteDialog, DeleteMealNoteDialog} from '@/features/canteen/components/MealNotesOverview'
import {Badge} from '@/lib/components/common/Badge'
import {Card, CardContent, CardHeader, CardTitle} from '@/lib/components/common/Card'

interface MealNotesOverviewListItemProps {
    note: any;
}

export const MealNotesOverviewListItem = ({note}: MealNotesOverviewListItemProps) => {
    return (
        <Card className="flex">
            <div className="flex flex-1 flex-col">
                <CardHeader className="flex-1">
                    <CardTitle>{note.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="secondary">
                        {note.type /* TODO: Handle translation via next intl */}
                    </Badge>
                </CardContent>
            </div>
            <div className="m-4 flex gap-2">
                <CreateOrEditMealNoteDialog note={note} />
                <DeleteMealNoteDialog note={note} />
            </div>
        </Card>
    )
}
