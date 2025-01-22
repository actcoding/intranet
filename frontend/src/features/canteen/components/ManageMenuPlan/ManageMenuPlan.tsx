import {
    LinkMenuDialog,
    ManageMenuPlanItem,
    ManageMenuPlanWeekSkipper,
} from '@/features/canteen/components/ManageMenuPlan'
import {servedAtDateFormat} from '@/features/canteen/constants'
import {startOfWeekByIndex} from '@/features/canteen/utils/startOfWeekByIndex'
import {MenuPlanResource} from '@/lib/api/generated'
import {Button} from '@/lib/components/common/Button'
import {addDays, format, isFuture, isToday} from 'date-fns'
import {PlusCircleIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'

interface ManageMenuPlanProps {
    planItems: MenuPlanResource[]
    selectedWeekIndex: number
}

export const ManageMenuPlan = ({planItems, selectedWeekIndex}: ManageMenuPlanProps) => {
    const {dateTime} = useFormatter()
    const weekStart = startOfWeekByIndex(selectedWeekIndex)
    const itemsGroupedByDay = planItems.reduce((acc, item) => {
        if (!acc[item.servedAt]) {
            acc[item.servedAt] = []
        }
        acc[item.servedAt].push(item)
        return acc
    }
    , {} as Record<string, MenuPlanResource[]>)

    const isEntryEditable = (day: Date) => {
        return isFuture(day) || isToday(day)
    }

    return (
        <div className={'flex flex-col gap-5'}>
            <ManageMenuPlanWeekSkipper />
            <div className={'grid grid-cols-5 gap-4'}>
                {Array.from({length: 5}, (_, i) => addDays(weekStart, i)).map((day) => (
                    <div className={'space-y-2'}>
                        <span>{dateTime(day, {weekday: 'long'})}</span>
                        <div className={'space-y-3'}>
                            {itemsGroupedByDay[format(day, servedAtDateFormat)]?.map((item) => (
                                <ManageMenuPlanItem item={item} key={item.id} isEntryEditable={isEntryEditable(day)} />
                            ))}
                            {isEntryEditable(day) ? (
                                <LinkMenuDialog
                                    day={day}
                                    trigger={
                                        <Button className={'w-full'} variant={'secondary'} aria-label={`Menü zu ${dateTime(day)} hinzufügen`}>
                                            <PlusCircleIcon size={20} />
                                        </Button>
                                    } />
                            ) : null}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
