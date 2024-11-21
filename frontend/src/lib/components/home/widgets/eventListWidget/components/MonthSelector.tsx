'use client'

import { Button } from '@/lib/components/common/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface MonthSelectorProps {
    currentMonth: string;
    goToPreviousMonth: () => void;
    goToNextMonth: () => void;
}

const MonthSelector = ({currentMonth, goToPreviousMonth, goToNextMonth}: MonthSelectorProps) => {
    return (
        <div className='flex items-center justify-between'>
            <Button variant='secondary' onClick={goToPreviousMonth}>
                <ChevronLeft />
            </Button>
            <p>{currentMonth}</p>
            <Button variant='secondary' onClick={goToNextMonth}>
                <ChevronRight />
            </Button>
        </div>
    )
}

export default MonthSelector