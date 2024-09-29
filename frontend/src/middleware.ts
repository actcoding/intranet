'use server'

import { getAppSession, refreshToken } from '@/lib/actions/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { IronSession } from 'iron-session'
import { AppSession } from '@/types/auth'

function isTokenExpired(session: IronSession<AppSession>) {
    Date.now() > (session?.expiresAt ?? Date.now())
    return true
}

export async function middleware(request: NextRequest) {
    let response = NextResponse.next()
    
    if (request.nextUrl.pathname.startsWith('/posts')) {
        const session = await getAppSession()
        
        if (isTokenExpired(session)) {
            console.log('Token is expired. Trying to get a new token...')
            response = await refreshToken(request, response)
            if (!response) {
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }
        }
        
        const roles = session?.sessionData?.roles

        if (!roles?.includes('Creator')) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }
    
    return response
}

export const config = {
    matcher: '/posts/:path*',
    // url "/manage/:path*"
}
