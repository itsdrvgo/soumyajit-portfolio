"use client";

import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { authSchema } from "@/lib/validation/auth";
import { Icons } from "../icons/icons";
import { PasswordInput } from "../global/password-input";
import { useTransition } from "react";

type Inputs = z.infer<typeof authSchema>

function SignUpForm() {
    const { toast } = useToast();

    const router = useRouter();
    const { isLoaded, signUp } = useSignUp();
    const [isPending, startTransition] = useTransition();

    const form = useForm<Inputs>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit(data: Inputs) {
        if (!isLoaded) return;

        startTransition(async () => {
            try {
                await signUp.create({
                    emailAddress: data.email,
                    password: data.password,
                });

                await signUp.prepareEmailAddressVerification({
                    strategy: "email_code",
                });

                router.push("/signup/verify-email");
                toast({
                    title: "Check your email!",
                    description: "We sent you a 6-digit verification code."
                });
            } catch (error) {
                const unknownError = "Something went wrong, please try again.";

                isClerkAPIResponseError(error)
                    ? toast({
                        title: "Oops!",
                        description: error.errors[0]?.longMessage ?? unknownError,
                    })
                    : toast({
                        title: "Oops!",
                        description: unknownError,
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="rodneymullen180@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput placeholder="**********" {...field} />
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
                    Continue
                    <span className="sr-only">Continue to email verification page</span>
                </Button>
            </form>
        </Form>
    );
}

export { SignUpForm };