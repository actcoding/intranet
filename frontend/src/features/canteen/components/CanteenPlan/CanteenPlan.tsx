'use client'

import CanteenPlanSelector from './components/CanteenPlanSelector'
import { useEffect, useState } from 'react'
import { MenuPlanResource } from '@/lib/api/generated'
import { getPlanListAction } from '@/lib/actions/canteen'
import MenuCardGrid from './components/CanteenPlanDailyMenu/MenuCardGrid'

const CanteenPlan = () => {
    const [date, setDate] = useState<Date>(new Date())
    const [menuList, setMenuList] = useState<MenuPlanResource[]>([])

    useEffect(() => {
        const fetchMenuList = async () => {
            const result = await getPlanListAction({
                from: date,
                to: date,
            })
            setMenuList(result)
        }
        fetchMenuList()
    }, [date])

    return (
        <>
            <CanteenPlanSelector
                selectedDate={date}
                onSelect={setDate}
            />
            <MenuCardGrid
                className='mt-4'
                menuList={menuList}
            />
        </>
    )
}

export default CanteenPlan