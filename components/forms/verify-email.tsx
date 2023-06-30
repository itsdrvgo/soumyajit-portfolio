"use client";

import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verfifyEmailSchema } from "@/lib/validation/auth";
import { Icons } from "../icons/icons";
import { useToast } from "../ui/use-toast";
import { useTransition } from "react";

type Inputs = z.infer<typeof verfifyEmailSchema>

export function VerifyEmailForm() {
    const { toast } = useToast();

    const router = useRouter();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [isPending, startTransition] = useTransition();

    const form = useForm<Inputs>({
        resolver: zodResolver(verfifyEmailSchema),
        defaultValues: {
            code: "",
        },
    });

    function onSubmit(data: Inputs) {
        if (!isLoaded) return;

        startTransition(async () => {
            try {
                const completeSignUp = await signUp.attemptEmailAddressVerification({
                    code: data.code,
                });
                if (completeSignUp.status !== "complete") {
                    console.log(JSON.stringify(completeSignUp, null, 2));
                }
                if (completeSignUp.status === "complete") {
                    await setActive({ session: completeSignUp.createdSessionId });
                    router.push(`${window.location.origin}/`);
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
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Verification Code</FormLabel>
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
                    Create account
                    <span className="sr-only">Create account</span>
                </Button>
            </form>
        </Form>
    );
}