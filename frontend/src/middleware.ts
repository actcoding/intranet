"use server";

import { getAppSession } from "@/app/actions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshToken } from "@/app/actions";
import { IronSession } from "iron-session";

function isTokenExpired(session: IronSession<AppSession>) {
    // return Date.now() > session.expiresAt;
    return true;
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/posts")) {
        const session = await getAppSession();
        const roles = session.sessionData?.roles;

        if (isTokenExpired(session)) {
            const res = await refreshToken(request);
            if (res !== undefined) {
                return res;
            }
        }
        if (!roles?.includes("Creator")) {
            return NextResponse.redirect(new URL("/auth/login", request.url));
        }
    }
}

export const config = {
    matcher: "/posts/:path*",
    // url "/manage/:path*"
};
