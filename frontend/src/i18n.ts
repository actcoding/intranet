import {getRequestConfig} from 'next-intl/server'
import {cookies, headers} from 'next/headers'

export const locales = ['de', 'en']

export default getRequestConfig(async () => {
    const locale =
        headers().get('accept-language')?.split(',')[0] || 'en-US'

    const timeZone = cookies().get('timezone')?.value || 'Europe/Berlin'

    return {
        locale,
        timeZone,
        messages: (await import(`../messages/${locale.split('-')[0]}.json`)).default,
    }
})
