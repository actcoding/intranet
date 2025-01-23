import {ManageMenuPlanWeekItem, ManageMenuPlanWeekSkipper} from '@/features/canteen/components/ManageMenuPlan'
import {servedAtDateFormat} from '@/features/canteen/constants'
import {startOfWeekByIndex} from '@/features/canteen/utils/startOfWeekByIndex'
import {MenuPlanResource} from '@/lib/api/generated'
import {addDays, format} from 'date-fns'

interface ManageMenuPlanProps {
    planItems: MenuPlanResource[]
    selectedWeekIndex: number
}

export const ManageMenuPlan = ({planItems, selectedWeekIndex}: ManageMenuPlanProps) => {
    const weekStart = startOfWeekByIndex(selectedWeekIndex)
    const itemsGroupedByDay = planItems.reduce((acc, item) => {
        if (!acc[item.servedAt]) {
            acc[item.servedAt] = []
        }
        acc[item.servedAt].push(item)
        return acc
    }
    , {} as Record<string, MenuPlanResource[]>)

    return (
        <div className={'flex flex-col gap-5'}>
            <ManageMenuPlanWeekSkipper />
            <div className={'grid grid-cols-5 gap-4'}>
                {Array.from({length: 5}, (_, i) => addDays(weekStart, i)).map((day) => (
                    <ManageMenuPlanWeekItem key={day.toString()} planItems={itemsGroupedByDay[format(day, servedAtDateFormat)]} day={day} />
                ))}
            </div>
        </div>
    )
}
