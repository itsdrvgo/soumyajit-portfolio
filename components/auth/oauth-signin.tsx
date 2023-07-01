"use client";

import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Icons } from "../icons/icons";
import { useToast } from "../ui/use-toast";
import { useState } from "react";
import { OAuthStrategy } from "@clerk/types";

const oauthProviders = [
    { name: "Google", strategy: "oauth_google", icon: "google" },
    { name: "Discord", strategy: "oauth_discord", icon: "discord" },
    { name: "GitHub", strategy: "oauth_github", icon: "github" }
] satisfies {
    name: string
    icon: keyof typeof Icons
    strategy: OAuthStrategy
}[];

function OAuthSignIn() {
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState<OAuthStrategy | null>(null);
    const { signIn, isLoaded: signInLoaded } = useSignIn();

    const oauthSignIn = async (provider: OAuthStrategy) => {
        if (!signInLoaded) return null;
        try {
            setIsLoading(provider);
            await signIn.authenticateWithRedirect({
                strategy: provider,
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/profile"
            });
        } catch (error) {
            setIsLoading(null);
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
    };

    return (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4">
            {oauthProviders.map((provider) => {
                const Icon = Icons[provider.icon];

                return (
                    <Button
                        aria-label={`Sign in with ${provider.name}`}
                        key={provider.strategy}
                        variant="outline"
                        className="w-full bg-background sm:w-auto"
                        onClick={() => void oauthSignIn(provider.strategy)}
                    >
                        {isLoading === provider.strategy
                            ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            : <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
                        }
                        {provider.name}
                    </Button>
                );
            })}
        </div>
    );
}

export { OAuthSignIn };