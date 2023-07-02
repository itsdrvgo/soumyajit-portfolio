import { HTMLAttributes } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface Props extends HTMLAttributes<HTMLElement> { }

function ProfileSkeleton({ className }: Props) {
    return (
        <>
        <div className={className}>
            <Card>
                <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>Enter your username or display name, whatever you are comfortable with</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="w-full md:w-1/4 h-9 bg-gray-700" />
                    <Skeleton className="w-24 h-10 bg-gray-700" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Send a request for account deletion. This is a non-reversable process, all of your data will be deleted.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-end">
                    <Skeleton className="w-32 h-10 bg-gray-700" />
                </CardContent>
            </Card>
        </div>
        </>
    );
}

export default ProfileSkeleton;