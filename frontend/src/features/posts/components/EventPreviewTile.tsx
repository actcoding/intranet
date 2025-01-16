import {cn} from '@/lib/utils'
import {isThisYear} from 'date-fns'
import {useFormatter} from 'next-intl'

interface EventPreviewTileProps {
    date: Date;
    className?: string;
}

const EventPreviewTile = ({date, className}: EventPreviewTileProps) => {
    const format = useFormatter()
    return (
        <div
            className={cn('flex flex-col items-center justify-center bg-primary/15 text-primary', className)}>
            <span>{format.dateTime(date, {month: 'short'})}</span>
            <span className="text-4xl font-bold">
                {format.dateTime(date, {day: 'numeric'})}
            </span>
            {isThisYear(date) ? null : (
                <span>{format.dateTime(date, {year: 'numeric'})}</span>)}
        </div>
    )
}

export {EventPreviewTile}
