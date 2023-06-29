import { OAuthSignIn } from "@/components/auth/oauth-signin";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import SoumyajitMainPicture from "@/public/soumyajit_01_main.jpg";
import { SignUpForm } from "@/components/forms/sign-up-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Don't have account? Create one now on Soumyajit's website"
};

function Page() {
    return (
        <>
            <div className="min-h-[calc(100vh-5rem)] container max-w-[55rem] grid items-center gap-8 pb-8 pt-6 md:py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                    <Image
                        alt="soumyajit_main"
                        src={SoumyajitMainPicture}
                        className="border rounded-lg md:rounded-r-none md:rounded-bl-lg md:border-r-0 md:border-b rounded-b-none border-b-0"
                    />
                    <Card className="border rounded-lg md:rounded-l-none md:rounded-tr-lg md:border-l-0 md:border-t rounded-t-none border-t-0">
                        <CardHeader>
                            <CardTitle>Create An Account</CardTitle>
                            <CardDescription>Choose your preferred sign up method</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            <OAuthSignIn />
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <SignUpForm />
                        </CardContent>
                        <CardFooter className="grid gap-4">
                            <div className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link
                                    aria-label="Sign in"
                                    href="/signin"
                                    className="text-primary underline-offset-4 transition-colors hover:underline"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Page;