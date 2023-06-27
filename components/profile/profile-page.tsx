import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { ProfileForm } from "../forms/profile-form";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function ProfilePage({ className }: PageProps) {
    const user = await currentUser();
    const dbUser = await db.query.users.findFirst({ where: eq(users.id, user!.id) });;
    if (!dbUser) redirect("/");

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>Enter your username or display name, whatever you are comfortable with</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProfileForm data={dbUser} />
                </CardContent>
            </Card>
        </>
    );
}

export default ProfilePage;