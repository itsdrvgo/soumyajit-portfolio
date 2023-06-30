"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons/icons";
import { useState } from "react";
import axios from "axios";
import { ResponseData } from "@/lib/validation/response";

interface PostCreateButtonProps extends ButtonProps { }

export function BlogCreateButton({
    className,
    variant,
    ...props
}: PostCreateButtonProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onClick() {
        setIsLoading(true);

        axios.post<ResponseData>("/api/blogs", {
            title: "Untitled Blog"
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(({ data: resData }) => {
            setIsLoading(false);
            if (resData.code !== 200) return toast({
                title: "Oops!",
                description: resData.message + ", try again later",
                variant: "destructive"
            });

            const blogId = JSON.parse(resData.data);
    
            router.refresh();
            router.push(`/admin/blogs/${blogId}`);
        });
    }

    return (
        <button
            onClick={onClick}
            className={cn(buttonVariants({ variant }), { "cursor-not-allowed opacity-60": isLoading, }, className)}
            disabled={isLoading}
            {...props}
        >
            {isLoading
                ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                : <Icons.add className="mr-2 h-4 w-4" />
            }
            New Blog
        </button>
    );
}