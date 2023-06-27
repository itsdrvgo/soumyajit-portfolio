"use client";

import { useRouter } from "next/navigation";
import { isClerkAPIResponseError, useSignIn, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import { checkUsernameSchema } from "@/lib/validation/auth";
import { Icons } from "../icons/icons";
import { HTMLAttributes, useTransition } from "react";
import { User } from "@/lib/drizzle/schema";

type Inputs = z.infer<typeof checkUsernameSchema>

interface PageProps extends HTMLAttributes<HTMLElement> {
    data: User
}

function ProfileForm({ data }: PageProps) {
    const { toast } = useToast();
    const { user } = useUser();

    const router = useRouter();
    const { isLoaded } = useSignIn();
    const [isPending, startTransition] = useTransition();

    const form = useForm<Inputs>({
        resolver: zodResolver(checkUsernameSchema),
        defaultValues: {
            userame: data.username ?? "",
        }
    });

    function onSubmit(values: Inputs) {
        if (!isLoaded) return;

        startTransition(async () => {
            try {
                const result = await user?.update({ username: values.userame });

                if (result) {
                    toast({
                        title: "Hurray!",
                        description: "Username change successful",
                    });
                    router.refresh();
                } else {
                    toast({
                        title: "Hurray!",
                        description: "Something went wrong, please try again.",
                    });
                }
            } catch (error) {
                console.log(error);
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
                className="flex flex-col w-1/2 gap-4"
                onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
            >
                <FormField
                    control={form.control}
                    name="userame"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="duckymomo2002" {...field} className="w-2/5" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} className="w-max">
                    {isPending && (
                        <Icons.spinner
                            className="mr-2 h-4 w-4 animate-spin"
                            aria-hidden="true"
                        />
                    )}
                    Save
                    <span className="sr-only">Save</span>
                </Button>
            </form>
        </Form>
    );
}

export { ProfileForm };