'use client'

import { Button } from '@/lib/components/common/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
    currentMonth: string;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
}

const MonthPicker = ({currentMonth, goToPreviousMonth, goToNextMonth}: MonthSelectorProps) => {
    return (
        <div className='flex items-center justify-between'>
            <Button variant='outline' onClick={goToPreviousMonth}>
                <ChevronLeft />
            </Button>
            <p className='font-semibold'>{currentMonth}</p>
            <Button variant='outline' onClick={goToNextMonth}>
                <ChevronRight />
            </Button>
        </div>
    )
}

export default MonthPicker