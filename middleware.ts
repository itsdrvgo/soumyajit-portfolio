import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const cache = new Map();

const globalRateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(20, "60s"),
    ephemeralCache: cache,
    analytics: true,
    timeout: 1000
});

const viewsRateLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.fixedWindow(5, "60s"),
    ephemeralCache: cache,
    analytics: true,
    timeout: 1000
});

export default authMiddleware({
    publicRoutes: [
        "/",
        "/signin(.*)",
        "/signup(.*)",
        "/sso-callback(.*)",
        "/api(.*)"
    ],
    async afterAuth(auth, req, evt) {
        if (auth.isPublicRoute) {
            if (req.nextUrl.pathname.startsWith("/api")) {
                if (req.nextUrl.pathname === "/api/blogs/views") {
                    const reqIp = req.ip ?? "127.0.0.1";

                    const { success, pending, limit, reset, remaining } = await viewsRateLimiter.limit(reqIp);
                    evt.waitUntil(pending);

                    const res = success
                        ? NextResponse.next()
                        : NextResponse.json({
                            code: 429,
                            message: "Too many view requests"
                        });

                    res.headers.set("X-RateLimit-Limit", limit.toString());
                    res.headers.set("X-RateLimit-Remaining", remaining.toString());
                    res.headers.set("X-RateLimit-Reset", reset.toString());
                    return res;
                } else {
                    const reqIp = req.ip ?? "127.0.0.1";

                    const { success, pending, limit, reset, remaining } = await globalRateLimiter.limit(reqIp);
                    evt.waitUntil(pending);

                    const res = success
                        ? NextResponse.next()
                        : NextResponse.json({
                            code: 429,
                            message: "Too many requests, go slow"
                        });

                    res.headers.set("X-RateLimit-Limit", limit.toString());
                    res.headers.set("X-RateLimit-Remaining", remaining.toString());
                    res.headers.set("X-RateLimit-Reset", reset.toString());
                    return res;
                }
            } else return NextResponse.next();
        }

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