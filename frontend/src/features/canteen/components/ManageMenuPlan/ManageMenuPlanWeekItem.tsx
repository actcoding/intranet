import {LinkMenuDialog} from '@/features/canteen/components/ManageMenuPlan/LinkMenuDialog'
import {ManageMenuPlanItem} from '@/features/canteen/components/ManageMenuPlan/ManageMenuPlanItem'
import {MenuPlanResource} from '@/lib/api/generated'
import {Alert, AlertDescription, AlertTitle} from '@/lib/components/common/Alert'
import {Button} from '@/lib/components/common/Button'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/shared/components/Tooltip'
import {isFuture, isToday} from 'date-fns'
import {PlusCircleIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'

interface ManageMenuPlanWeekItemProps {
    day: Date;
    planItems: MenuPlanResource[];
}

export const ManageMenuPlanWeekItem = ({day, planItems}: ManageMenuPlanWeekItemProps) => {
    const {dateTime} = useFormatter()
    const isEntryEditable = isFuture(day) || isToday(day)

    return (
        <div className={'space-y-2'}>
            <span>{dateTime(day, {weekday: 'long'})}</span>
            <div className={'space-y-3'}>
                {planItems?.length > 0 ? (
                    planItems.map((item) => (
                        <ManageMenuPlanItem item={item} key={item.id} isEntryEditable={isEntryEditable} />
                    ))
                ) : (
                    <Alert>
                        <AlertTitle>Keine Menüs geplant</AlertTitle>
                        <AlertDescription>Für diesen Tag wurden {isEntryEditable ? 'noch' : null} keine Menüs geplant.</AlertDescription>
                    </Alert>
                )}
                {isEntryEditable ? (
                    <LinkMenuDialog
                        day={day}
                        trigger={
                            <Button className={'w-full'} variant={'secondary'} aria-label={`Menü zu ${dateTime(day)} hinzufügen`}>
                                <PlusCircleIcon size={20} />
                            </Button>
                        } />
                ) : (
                    <Tooltip>
                        <TooltipTrigger asChild ignoreDisabledChild>
                            <Button className={'w-full'} variant={'secondary'} aria-label={`Menü zu ${dateTime(day)} hinzufügen`} disabled>
                                <PlusCircleIcon size={20} />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Du kannst diesen Eintrag nicht mehr bearbeiten.</TooltipContent>
                    </Tooltip>
                )}

            </div>
        </div>
    )
}
