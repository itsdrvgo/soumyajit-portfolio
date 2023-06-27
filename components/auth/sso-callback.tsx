"use client";

import { useClerk } from "@clerk/nextjs";
import { type SSOCallbackPageProps } from "@/app/(auth)/sso-callback/page";
import { Icons } from "../icons/icons";
import { useEffect } from "react";

function SSOCallbackRedirect({ searchParams }: SSOCallbackPageProps) {
    const { handleRedirectCallback } = useClerk();

    useEffect(() => {
        void handleRedirectCallback(searchParams);
    }, [searchParams, handleRedirectCallback]);

    return (
        <div
            role="status"
            aria-label="Loading"
            aria-describedby="loading-description"
            className="flex items-center justify-center"
        >
            <Icons.spinner className="h-16 w-16 animate-spin" aria-hidden="true" />
        </div>
    );
}

export default SSOCallbackRedirect;