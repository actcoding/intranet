"use server";

import { IronSession, getIronSession } from "iron-session";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";

interface AppSessionData {
    user: {
        id: number;
        name: string;
        email: string;
        avatar_url: string | null;
    };
    roles: string[];
    permissions: string[];
}

interface AppSession {
    access_token: string;
    data: AppSessionData;
}

export async function getAppSession(): Promise<IronSession<AppSession>> {
    return getIronSession<AppSession>(cookies(), {
        password: process.env.APP_SECRET as string,
        cookieName: "intranet_session",
        ttl: 60 * 60 * 24 * 7,
    });
}

export async function handleLogin(credentials: {
    email: string;
    password: string;
}): Promise<object | undefined> {
    const res = await fetch("http://localhost:8000/api/auth/login", {
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
    session.data = decoded;

    await session.save();

    return undefined;
}
