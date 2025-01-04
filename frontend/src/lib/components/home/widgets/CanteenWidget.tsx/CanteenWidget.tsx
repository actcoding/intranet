'use client'

import { getPlanListAction } from '@/lib/actions/canteen'
import { MenuPlanResource } from '@/lib/api/generated'
import { Card, CardContent, CardHeader } from '@/lib/components/common/Card'
import { useEffect, useState } from 'react'
import DaySelector from './components/DaySelector'
import MenuList from './components/MenuList'

const CanteenWidget = () => {
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

    // Day Selector
    return (
        <Card className='w-full max-w-md flex-col justify-between'>
            <CardHeader>
                <DaySelector
                    selectedDate={date}
                    onSelect={setDate} 
                />
            </CardHeader>
            <CardContent>
                <MenuList 
                    menuPlanList={menuList}
                />
            </CardContent>
        </Card>
    )
    // Display of Menus
}

export default CanteenWidget