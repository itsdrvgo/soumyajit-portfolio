import { redirect } from "next/navigation";
import LoginButton from "./login-button";
import { auth } from "@clerk/nextjs";
import DropdownProfile from "./dropdown-profile";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

async function Auth() {
    const { userId } = auth();
    if (!userId) return (
        <LoginButton className="px-4 flex gap-2 items-center" />
    );

    const dbUser = await db.query.users.findFirst({ where: eq(users.id, userId) });;
    if (!dbUser) redirect("/");

    return (
        <DropdownProfile user={dbUser} />
    );
}

export default Auth;