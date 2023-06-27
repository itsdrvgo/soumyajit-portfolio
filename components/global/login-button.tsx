"use client";

import { HTMLAttributes } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

function LoginButton({ className }: HTMLAttributes<HTMLElement>) {
    const router = useRouter();

    return (
        <>
            <Button
                variant={"secondary"}
                size={"sm"}
                className={className}
                onClick={() => router.push("/sign-in")}
            >
                <p className="text-gray-300">Login</p>
            </Button>
        </>
    );
}

export default LoginButton;