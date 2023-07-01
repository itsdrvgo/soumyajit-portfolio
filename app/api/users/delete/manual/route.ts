import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { checkRoleHierarchy, handleError } from "@/lib/utils";
import { userDeleteSchema } from "@/lib/validation/users";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const { userId } = userDeleteSchema.parse(body);

        const user = await currentUser();
        if (!user) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });
        if (!dbUser || ["user", "moderator"].includes(dbUser.role)) return NextResponse.json({
            code: 403,
            message: "Unauthorized"
        });

        const target = await db.query.users.findFirst({ where: eq(users.id, userId) });
        if (!target) return NextResponse.json({
            code: 403,
            message: "Target not found"
        });

        if (target.id === dbUser.id) return NextResponse.json({
            code: 403,
            message: "You cannot delete your account from here"
        });

        if (!checkRoleHierarchy(dbUser.role, target.role)) return NextResponse.json({
            code: 403,
            message: "You don't have permission to execute this action"
        });

        await clerkClient.users.deleteUser(target.id);

        return NextResponse.json({
            code: 200,
            message: "Ok"
        });
    } catch (err) {
        handleError(err);
    }
}