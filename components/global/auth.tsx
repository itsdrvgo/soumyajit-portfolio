import { redirect } from "next/navigation";
import LoginButton from "./login-button";
import { currentUser } from "@clerk/nextjs";
import DropdownProfile from "./dropdown-profile";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

async function Auth() {
    const user = await currentUser();
    if (!user) return (
        <LoginButton className="px-4 flex gap-2 items-center" />
    );

    const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });;
    if (!dbUser) redirect("/");

    return (
        <DropdownProfile user={dbUser} />
    );
}

export default Auth;