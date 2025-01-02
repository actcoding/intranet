'use client'

import CanteenPlanSelector from './components/CanteenPlanSelector'
import { useEffect, useState } from 'react'
import CanteenPlanDailyMenu from './components/CanteenPlanDailyMenu/CanteenPlanDailyMenu'
import LoadMenu from './components/LoadMenu'
import { MenuPlanResource } from '@/lib/api/generated'
import { getPlanListAction } from '@/lib/actions/canteen'

const CanteenPlan = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [menuList, setMenuList] = useState<MenuPlanResource[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchMenuList = async () => {
            setIsLoading(true)
            const result = await getPlanListAction({
                from: date,
                to: date,
            })
            setMenuList(result)
            setIsLoading(false)
        }
        fetchMenuList()
    }, [date])

    return (
        <>
            <CanteenPlanSelector
                selected={date}
                onSelect={setDate}
            />
            <CanteenPlanDailyMenu
                className='mt-4'
                menuList={menuList}
            />
        </>
    )
}

export default CanteenPlan