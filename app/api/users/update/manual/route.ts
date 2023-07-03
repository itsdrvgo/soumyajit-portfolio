import { db } from "@/lib/drizzle";
import { User, users } from "@/lib/drizzle/schema";
import { checkRoleHierarchy, handleError } from "@/lib/utils";
import { roleUpdateSchema } from "@/lib/validation/users";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const { role, userId, action } = roleUpdateSchema.parse(body);

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

        if (dbUser.id === target.id) return NextResponse.json({
            code: 403,
            message: "You cannot update your own role"
        });

        if (!checkRoleHierarchy(dbUser.role, target.role)) return NextResponse.json({
            code: 403,
            message: "You don't have permission to execute this action"
        });

        let updatedRole: User["role"];

        switch (action) {
            case "promote": {
                switch (role) {
                    case "user":
                        updatedRole = "moderator";
                        break;

                    case "moderator":
                        updatedRole = "admin";
                        break;

                    default:
                        updatedRole = role;
                }
            }
                break;

            case "demote": {
                switch (role) {
                    case "admin":
                        updatedRole = "moderator";
                        break;

                    case "moderator":
                        updatedRole = "user";
                        break;

                    default:
                        updatedRole = role;
                }
            }
                break;

            default:
                updatedRole = role;
        }

        await db.update(users).set({
            role: updatedRole
        }).where(eq(users.id, userId));

        return NextResponse.json({
            code: 200,
            message: "Ok"
        });
    } catch (err) {
        handleError(err);
    }
}