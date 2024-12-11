'use server'

import { isProduction } from '@/lib/utils'
import { ApiResponse, AppSession, AppJwtPayload } from '@/types'
import { getIronSession, IronSession } from 'iron-session'
import { decodeJwt } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authApi } from '../api/api'
import { ResponseError } from '../api/generated'
import { ApiResult } from './news'

export async function getAppSession(): Promise<IronSession<AppSession>> {
    return getIronSession<AppSession>(cookies(), {
        password: process.env.APP_SECRET as string,
        cookieName: 'intranet_session',
        cookieOptions: {
            secure: isProduction(),
            sameSite: 'strict',
        },
        ttl: 60 * 60 * 24 * 7,
    })
}

export async function setAppSession(
    accessToken: string,
    refreshToken: string,
) {
    const decoded = decodeJwt<AppJwtPayload>(accessToken)

    const session = await getAppSession()

    session.accessToken = accessToken
    session.refreshToken = refreshToken
    session.sessionData = decoded
    await session.save()

    return session
}

const apiUrl = process.env.API_URL as string

export async function handleLogin(loginRequest: {
    email: string;
    password: string;
}): Promise<ApiResult<null>> {
    try {
        const { accessToken, refreshToken } = await authApi.authLogin({ loginRequest })
        const { sessionData } = await setAppSession(accessToken, refreshToken)

        if (sessionData?.user.status === 'must_reset_password') {
            redirect('/auth/welcome')
        } else {
            redirect('/')
        }
    } catch (error) {
        if (error instanceof ResponseError) {
            const data = await error.response.json()
            return {
                data: null,
                error: {
                    message: data.message,
                },
            }
        }

        return {
            data: null,
            error: {
                //@ts-expect-error error is unknown
                message: error.message,
            },
        }
    }
}

export async function handleLogout(): Promise<void> {
    const session = await getAppSession()

    session.destroy()
    redirect('/auth/login')
}

export type ResetPasswordPayload = {
    password: string;
    password_confirmation: string;
}

export async function resetPassword(
    newPassword: ResetPasswordPayload,
    token?: string,
): Promise<ApiResponse | undefined> {
    const session = await getAppSession()

    const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        body: JSON.stringify({ ...newPassword, token }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + session.accessToken,
        },
    })

    if (!res.ok) {
        const data = await res.json()
        return {
            status: res.status,
            ...data,
        }
    }

    session.destroy()
    redirect('/auth/login')
}
