import { MiddlewareConfig, NextResponse } from 'next/server'

export async function middleware() {
    // const { refreshToken: oldRefreshToken, sessionData, destroy } = await getAppSession()

    // TODO: Check validity on every request, refresh if necessary
    /* if (sessionData !== undefined) {
        console.log(sessionData)
        if (Date.now() >= (sessionData.exp ?? 0 * 1000)) {
            try {
                const { accessToken, refreshToken } = await authApi.authRefresh({
                    refreshTokenRequest: {
                        refreshToken: oldRefreshToken!,
                    },
                })
                await setAppSession(accessToken, refreshToken)
            } catch (error) {
                destroy()
                return NextResponse.redirect('/')
            }
        }
    } */

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
