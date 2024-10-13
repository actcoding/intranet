'use server'

import { getAppSession } from '@/lib/actions/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IronSession } from 'iron-session'
import { AppSession, AppSessionData } from '@/types/auth'
import { decodeJwt } from 'jose'

function isTokenExpired(session: IronSession<AppSession>) {
    Date.now() > (session?.expiresAt ?? Date.now())
    return true
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next()
    
    if (request.nextUrl.pathname.startsWith('/posts')) {
        const apiUrl = process.env.API_URL as string
        const session = await getAppSession()
        
        if (!session || isTokenExpired(session)) {
            // Refresh token API request
            const tokenResponse = await fetch(`${apiUrl}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ refresh_token: session.refresh_token }),
            })
            if (tokenResponse.ok) {
                const { access_token, refresh_token } = await tokenResponse.json()
                const decoded = decodeJwt<AppSessionData>(access_token)

                session.access_token = access_token
                session.refresh_token = refresh_token
                session.sessionData = decoded
                session.expiresAt = decoded.exp

            } else {
                session.destroy()
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }
        } else {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
            
    }
    
    return response
}

export const config = {
    matcher: '/posts/:path*',
    // url "/manage/:path*"
}
