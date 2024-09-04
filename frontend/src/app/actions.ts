"use server";

import { ApiResponse } from "@/types";
import { SessionOptions, IronSession, getIronSession } from "iron-session";
import { decodeJwt } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const sessionOptions: SessionOptions = {
    password: process.env.APP_SECRET as string,
    cookieName: "intranet_session",
    ttl: 60 * 60 * 24 * 7,
};

export async function getAppSession(): Promise<IronSession<AppSession>> {
    return getIronSession<AppSession>(cookies(), sessionOptions);
}

export async function getReqSession(
    request: NextRequest,
    response: NextResponse
): Promise<IronSession<AppSession>> {
    return getIronSession<AppSession>(request, response, sessionOptions);
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

    const { access_token, refresh_token } = await res.json();
    const decoded = decodeJwt<AppSessionData>(access_token);

    const session = await getAppSession();

    session.access_token = access_token;
    session.refresh_token = refresh_token;
    session.sessionData = decoded;
    session.expiresAt = decoded.exp ? decoded.exp * 1000 : undefined; //convert to milliseconds
    await session.save();

    console.log("refresh token", refresh_token);
    if (session.sessionData.user.status === "must_reset_password") {
        redirect("/auth/welcome");
    } else {
        redirect("/");
    }
}

export async function handleLogout(): Promise<void> {
    const session = await getAppSession();
    // invalidate tokens
    fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + session.access_token,
        },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
    });

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

export async function refreshToken(request: NextRequest) {
    let response = NextResponse.next();
    const session = await getReqSession(request, response);

    const tokenResponse = await fetch(`${apiUrl}/auth/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ refresh_token: session.refresh_token }),
    });

    console.log(tokenResponse.status);

    if (tokenResponse.ok) {
        const { access_token, refresh_token } = await tokenResponse.json();
        const decoded = decodeJwt<AppSessionData>(access_token);

        session.access_token = access_token;
        session.refresh_token = refresh_token;
        session.sessionData = decoded;
        await session.save();
    } else {
        response = NextResponse.redirect(new URL("/auth/login", request.url));
        const session = await getReqSession(request, response);
        session.destroy();
        return response;
    }
}
