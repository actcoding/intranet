import { endOfDay, isEqual, startOfDay } from 'date-fns'

export const eventIsAllDay = (
    startingAt: Date | string,
    endingAt: Date | string,
) => {
    return (
        isEqual(startingAt, startOfDay(startingAt).setMilliseconds(0)) &&
        isEqual(endingAt, endOfDay(endingAt).setMilliseconds(0))
    )
}
