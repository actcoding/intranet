'server-only'

import { getAppSession } from '@/lib/actions/auth'
import { AuthApi, Configuration, EventApi, NewsApi } from '@/lib/api/generated'

const configuration = new Configuration({
    basePath: process.env.API_URL,
    accessToken: async () => {
        const { access_token } = await getAppSession()
        return access_token!
    },
    headers: {
        Accept: 'application/json',
    },
    fetchApi: async (input: RequestInfo, init: RequestInit) => {
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
export const eventApi = new EventApi(configuration)

export const authApi = new AuthApi(configuration)

export const eventApi = new EventApi(configuration)
