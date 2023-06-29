import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/signin(.*)",
        "/signup(.*)",
        "/sso-callback(.*)",
        "/api(.*)"
    ],
    async afterAuth(auth, req) {
        if (auth.isPublicRoute) return NextResponse.next();

        const url = new URL(req.nextUrl.origin);

        if (!auth.userId) {
            url.pathname = "/signin";
            return NextResponse.redirect(url);
        } else return NextResponse.next();
    }
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)"
    ]
};