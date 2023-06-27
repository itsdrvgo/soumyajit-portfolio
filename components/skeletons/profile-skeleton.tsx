import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

function ProfileSkeleton() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Username</CardTitle>
                    <CardDescription>Enter your username or display name, whatever you are comfortable with</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    <Skeleton className="w-1/4 h-9 bg-gray-700" />
                    <Skeleton className="w-1/12 h-10 bg-gray-700" />
                </CardContent>
            </Card>
        </>
    );
}

export default ProfileSkeleton;