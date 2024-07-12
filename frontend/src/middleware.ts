import { getAppSession } from "@/app/actions";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const roles = (await getAppSession()).sessionData?.roles;
    if (!roles?.includes("Creator")) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }
}

export const config = {
    matcher: "/posts/:path*",
    // url "/manage/:path*"
};
