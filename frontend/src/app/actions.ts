"use server";

import { IronSession, getIronSession } from "iron-session";
import { decodeJwt } from "jose";
import { SquareScissorsIcon } from "lucide-react";
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
}): Promise<ApiError | undefined> {
    const res = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const data = await res.json();
        return {
            code: res.status,
            error: data.error,
        };
    }

    const { access_token } = await res.json();
    const decoded = decodeJwt<AppSessionData>(access_token);

    const session = await getAppSession();

    session.access_token = access_token;
    session.sessionData = decoded;
    await session.save();

    if (session.sessionData.user.status === "must_reset_password") {
        redirect("/auth/password-reset");
    } else {
        redirect("/");
    }
}

export async function handleLogout(): Promise<void> {
    const session = await getAppSession();

    session.destroy();
    redirect("/auth/login");
}

export async function resetPassword(newPassword: {
    password: string;
    password_confirmation: string;
}) {
    const session = await getAppSession();

    const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify(newPassword),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.access_token,
        },
    });

    if (!res.ok) {
        return await res.json();
    } else {
        session.destroy();
    }

    redirect("/auth/login");
}
