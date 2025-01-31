'use client'

import {startOfWeekByIndex} from '@/features/canteen/utils/startOfWeekByIndex'
import {Button} from '@/lib/components/common/Button'
import {endOfWeek} from 'date-fns'
import {CalendarRangeIcon, ChevronLeftIcon, ChevronRightIcon} from 'lucide-react'
import {useFormatter} from 'next-intl'
import Link from 'next/link'
import {useSearchParams} from 'next/navigation'

export const ManageMenuPlanWeekSkipper = () => {
    const format = useFormatter()
    const searchParams = useSearchParams()
    const selectedWeekIndex = parseInt(searchParams.get('week') || '0')
    const selectedFrom = startOfWeekByIndex(selectedWeekIndex)
    const selectedTo = endOfWeek(selectedFrom, {weekStartsOn: 1})

    return (
        <div>
            <div className={'flex items-center justify-between gap-3'}>
                <Button asChild variant={'outline'} aria-label={'Vorherige Woche'} size={'icon'}>
                    <Link href={`/manage/canteen/plan?week=${selectedWeekIndex - 1}`}>
                        <ChevronLeftIcon size={20} />
                    </Link>
                </Button>
                <span>Woche vom <span
                    className={'font-semibold'}>{format.dateTimeRange(selectedFrom, selectedTo)}</span></span>
                <div className={'space-x-2'}>
                    <Button asChild variant={'outline'} aria-label={'Nächste Woche'} size={'icon'}>
                        <Link href={`/manage/canteen/plan?week=${selectedWeekIndex + 1}`}>
                            <ChevronRightIcon size={20} />
                        </Link>
                    </Button>
                    <Button variant={'outline'} disabled={selectedWeekIndex === 0} size={'icon'} asChild>
                        <Link href={'/manage/canteen/plan'}><CalendarRangeIcon size={20} /></Link>
                    </Button>
                </div>
            </div>



        </div>
    )
}
