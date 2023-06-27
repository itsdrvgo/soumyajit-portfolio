import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/sign-in(.*)",
        "/sign-up(.*)",
        "/sso-callback(.*)",
        "/api(.*)"
    ]
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/admin(.*)",
        "/blog(.*)",
        "/profile(.*)"
    ]
};