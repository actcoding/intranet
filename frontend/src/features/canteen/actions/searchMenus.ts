'use server'

import {canteenApi} from '@/lib/api/api'

export const searchMenus = async ({query}: {query: string}) => {
    const res = await canteenApi.menuIndex()
    return res.data.filter((menu) => menu.name.toLowerCase().includes(query.toLowerCase()))
}
