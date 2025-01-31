import {addWeeks, startOfWeek} from 'date-fns'

export const startOfWeekByIndex = (index: number) => {
    return addWeeks(startOfWeek(new Date(), {weekStartsOn: 1}), index)
}
