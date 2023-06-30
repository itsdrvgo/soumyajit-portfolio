import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { ProfileForm } from "../forms/profile-form";
import AccountDeleteButton from "./delete-button";
import { User } from "@clerk/nextjs/dist/types/server";

interface PageProps extends HTMLAttributes<HTMLElement> {
    user: User
}

async function ProfilePage({ className, user }: PageProps) {
    const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });;
    if (!dbUser) redirect("/");

    return (
        <>
            <div className={className}>
                <Card>
                    <CardHeader>
                        <CardTitle>Username</CardTitle>
                        <CardDescription>Enter your username or display name, whatever you are comfortable with.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileForm data={dbUser} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Danger Zone</CardTitle>
                        <CardDescription>Send a request for account deletion. This is a non-reversable process, all of your data will be deleted.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <AccountDeleteButton className="flex justify-end" />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default ProfilePage;