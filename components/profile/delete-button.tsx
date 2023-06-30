"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { HTMLAttributes, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Icons } from "../icons/icons";
import { isClerkAPIResponseError, useSignIn, useUser } from "@clerk/nextjs";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function AccountDeleteButton({ className }: PageProps) {
    const { toast } = useToast();
    const router = useRouter();

    const { user } = useUser();
    const { isLoaded } = useSignIn();
    const [isPending, startTransition] = useTransition();

    const handleAccountDeletion = () => {
        if (!isLoaded) return;

        startTransition(async () => {
            try {
                await user?.delete();

                toast({
                    title: "Hurray!",
                    description: "Account deletion successful",
                });
                router.refresh();
                router.push("/");
            } catch (error) {
                console.log(error);
                const unknownError = "Something went wrong, please try again.";

                isClerkAPIResponseError(error)
                    ? toast({
                        title: "Oops!",
                        description: error.errors[0]?.longMessage ?? unknownError,
                        variant: "destructive"
                    })
                    : toast({
                        title: "Oops!",
                        description: unknownError,
                        variant: "destructive"
                    });
            }
        });
    };

    return (
        <>
            <div className={className}>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"} className="flex gap-1 items-center">
                            {isPending
                                ? <Icons.spinner className="h-4 w-4" />
                                : <Icons.trash className="h-4 w-4" />
                            }
                            <p>Delete Account</p>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure about your account deletion?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={handleAccountDeletion}
                            >
                                Yes, I&apos;m sure
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </>
    );
}

export default AccountDeleteButton;