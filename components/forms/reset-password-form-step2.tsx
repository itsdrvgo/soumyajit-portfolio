"use client";

import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { resetPasswordSchema } from "@/lib/validation/auth";
import { PasswordInput } from "../global/password-input";
import { Icons } from "../icons/icons";
import { useToast } from "../ui/use-toast";

type Inputs = z.infer<typeof resetPasswordSchema>

function ResetPasswordStep2Form() {
    const { toast } = useToast();

    const router = useRouter();
    const { isLoaded, signIn, setActive } = useSignIn();
    const [isPending, startTransition] = useTransition();

    const form = useForm<Inputs>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
            code: "",
        },
    });

    function onSubmit(data: Inputs) {
        if (!isLoaded) return;

        startTransition(async () => {
            try {
                const attemptFirstFactor = await signIn.attemptFirstFactor({
                    strategy: "reset_password_email_code",
                    code: data.code,
                    password: data.password,
                });

                if (attemptFirstFactor.status === "needs_second_factor") {
                } else if (attemptFirstFactor.status === "complete") {
                    await setActive({
                        session: attemptFirstFactor.createdSessionId,
                    });
                    router.push(`${window.location.origin}/`);
                    toast({
                        title: "Hurray!",
                        description: "Password reset successful."
                    });
                } else {
                    console.error(attemptFirstFactor);
                }
            } catch (error) {
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
    }

    return (
        <Form {...form}>
            <form
                className="grid gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="*********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="*********" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Code</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="169420"
                                    {...field}
                                    onChange={(e) => {
                                        e.target.value = e.target.value.trim();
                                        field.onChange(e);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending}>
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Reset password
                    <span className="sr-only">Reset password</span>
                </Button>
            </form>
        </Form>
    );
}

export { ResetPasswordStep2Form };