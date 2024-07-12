"use server";

import { ApiResponse } from "@/types";
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
}): Promise<ApiResponse | undefined> {
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
            status: res.status,
            ...data,
        };
    }

    const { access_token } = await res.json();
    const decoded = decodeJwt<AppSessionData>(access_token);

    const session = await getAppSession();

    session.access_token = access_token;
    session.sessionData = decoded;
    session.expiresAt = decoded.exp ? decoded.exp * 1000 : undefined; //convert to milliseconds
    await session.save();

    if (session.sessionData.user.status === "must_reset_password") {
        redirect("/auth/welcome");
    } else {
        redirect("/");
    }
}

export async function handleLogout(): Promise<void> {
    const session = await getAppSession();

    session.destroy();
    redirect("/auth/login");
}

export type ResetPasswordPayload = {
    password: string;
    password_confirmation: string;
};

export async function resetPassword(
    newPassword: ResetPasswordPayload,
    token?: string
): Promise<ApiResponse | undefined> {
    const session = await getAppSession();

    const res = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        body: JSON.stringify({ ...newPassword, token }),
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.access_token,
        },
    });

    if (!res.ok) {
        const data = await res.json();
        return {
            status: res.status,
            ...data,
        };
    }

    session.destroy();
    redirect("/auth/login");
}

export async function refreshToken() {
    const session = await getAppSession();

    const response = await fetch(`${apiUrl}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session.access_token,
        },
    });

    if (response.ok) {
        const { access_token } = await response.json();
        const decoded = decodeJwt<AppSessionData>(access_token);

        session.access_token = access_token;
        session.sessionData = decoded;
        await session.save();
    } else {
        session.destroy();
        redirect("/auth/login");
    }
}
