"use server";

import { IronSession, getIronSession } from "iron-session";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getAppSession(): Promise<IronSession<AppSession>> {
    return getIronSession<AppSession>(cookies(), {
        password: process.env.APP_SECRET as string,
        cookieName: "intranet_session",
        ttl: 60 * 60 * 24 * 7,
    });
}

const apiUrl = process.env.API_URL as string;

export async function handleLogin(credentials: {
    email: string;
    password: string;
}): Promise<object | undefined> {
    const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        return await res.json();
    }

    const { access_token } = await res.json();
    const decoded = decodeJwt<AppSessionData>(access_token);

    const session = await getAppSession();

    session.access_token = access_token;
    session.sessionData = decoded;

    await session.save();

    return undefined;
}

export async function handleLogout(): Promise<void> {
    const session = await getAppSession();

    session.destroy();
    redirect("/auth/login");
}

export async function resetPassword(newPassword: {
    password: string
    password_confirm: string
}){

    const session = await getAppSession()

    const res = await fetch(`${apiUrl}/auth/password/reset`, {
        method: "POST",
        body: JSON.stringify(newPassword),
        headers: {
            "Content-Type": "application/json",
        },
    })

    if (!res.ok) {
        return await res.json()
    }

    return undefined
}
