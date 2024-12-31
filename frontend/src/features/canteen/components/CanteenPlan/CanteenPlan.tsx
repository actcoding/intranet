'use client'

import CanteenPlanSelector from './components/CanteenPlanSelector/CanteenPlanSelector'


const CanteenPlan = () => {
    
    
    return (
        <>
            <CanteenPlanSelector
                onDateChange={(date: Date) => console.log(date)}
            />
        </>
    )
}

export default CanteenPlan