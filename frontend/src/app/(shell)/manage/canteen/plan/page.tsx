import {ManageMenuPlan} from '@/features/canteen/components/ManageMenuPlan'
import {servedAtDateFormat} from '@/features/canteen/constants'
import {startOfWeekByIndex} from '@/features/canteen/utils/startOfWeekByIndex'
import {canteenApi} from '@/lib/api/api'
import {endOfWeek, format} from 'date-fns'

interface ManageCanteenPlanPageProps {
    searchParams?: {
        week?: number;
    }
}

const ManageCanteenPlanPage = async ({ searchParams }: ManageCanteenPlanPageProps) => {
    try {
        const fromDate = startOfWeekByIndex(searchParams?.week || 0)
        const from = format(fromDate, servedAtDateFormat)
        const toDate = endOfWeek(fromDate, {weekStartsOn: 1})
        const to = format(toDate, servedAtDateFormat)
        const planItems = await canteenApi.planList({from, to})
        return (
            <ManageMenuPlan planItems={planItems} selectedWeekIndex={searchParams?.week || 0} />
        )
    } catch (e) {
        console.error(e)
    }
}

export default ManageCanteenPlanPage
