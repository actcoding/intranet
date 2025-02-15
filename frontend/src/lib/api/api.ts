'server-only'

import { getAppSession } from '@/lib/actions/auth'
import { AuthApi, CanteenApi, Configuration, EventApi, LinkApi, NewsApi } from '@/lib/api/generated'

const configuration = new Configuration({
    basePath: process.env.API_URL,
    headers: {
        Accept: 'application/json',
    },
    fetchApi: async (input: RequestInfo, init: RequestInit) => {
        const { access_token } = await getAppSession()
        if (access_token !== undefined) {
            init.headers = {
                ...init.headers,
                'Authorization': `Bearer ${access_token}`,
            }
        }

        const res = await fetch(input, init)
        console.log(
            'API:',
            init.method,
            res.url,
            JSON.stringify(init.body),
            '(' + res.status,
            res.statusText + ')',
        )
        return res
    },
})

export const newsApi = new NewsApi(configuration)

export const authApi = new AuthApi(configuration)

export const eventApi = new EventApi(configuration)

export const linkApi = new LinkApi(configuration)

export const canteenApi = new CanteenApi(configuration)
