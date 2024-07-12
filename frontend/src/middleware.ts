import { getAppSession } from "@/app/actions";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshToken } from "@/app/actions";
import { IronSession } from "iron-session";

function isTokenExpired(session: IronSession<AppSession>) {
    if (!session.expiresAt) return true;
    return Date.now() > session.expiresAt;
}

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/posts")) {
        const session = await getAppSession();
        const roles = session.sessionData?.roles;

        if (isTokenExpired(session)) {
            refreshToken();
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
