import { type Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import SoumyajitMainPicture from "@/public/soumyajit_01_main.jpg";
import Image from "next/image";
import { VerifyEmailForm } from "@/components/forms/verify-email";

export const metadata: Metadata = {
    title: "Verify Email",
    description: "Verify your email address to continue with your sign up"
};

function VerifyEmailPage() {
    return (
        <div className="min-h-[calc(100vh-5rem)] container max-w-[55rem] grid items-center gap-8 pb-8 pt-6 md:py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                <Image
                    alt="soumyajit_main"
                    src={SoumyajitMainPicture}
                    className="border rounded-lg md:rounded-r-none md:rounded-bl-lg md:border-r-0 md:border-b rounded-b-none border-b-0"
                />
                <Card className="border rounded-lg md:rounded-l-none md:rounded-tr-lg md:border-l-0 md:border-t rounded-t-none border-t-0">
                    <CardHeader>
                        <CardTitle>Verify email</CardTitle>
                        <CardDescription>Verify your email address to complete your account creation</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <VerifyEmailForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default VerifyEmailPage;