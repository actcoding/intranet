'use server'

import {canteenApi} from '@/lib/api/api'

const searchDishes = async ({query}: { query: string }) => {
    const res = await canteenApi.dishIndex()
    return res.data.filter((dish) => dish.name.toLowerCase().includes(query.toLowerCase()))
}

export { searchDishes }
