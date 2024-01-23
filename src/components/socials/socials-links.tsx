"use client";

import { siteConfig } from "@/src/config/site";
import { cn } from "@/src/lib/utils";
import { Link } from "@nextui-org/react";
import GoBackButton from "../global/buttons/go-back-button";
import { Icons } from "../icons/icons";

function SocialsLinks() {
    return (
        <>
            <div className="flex items-center justify-around">
                {Object.entries(siteConfig.links).map(([key, value]) => {
                    const Icon = Icons[key as keyof typeof Icons];

                    return (
                        <Link
                            key={key}
                            href={value}
                            isExternal
                            color="foreground"
                            className={cn(
                                "rounded-full p-5",
                                key === "facebook" && "bg-blue-800",
                                key === "instagram" &&
                                    "bg-gradient-to-br from-pink-600 to-red-600",
                                key === "youtube" && "bg-red-700"
                            )}
                        >
                            <Icon className="size-6" />
                        </Link>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <GoBackButton color="primary" />
            </div>
        </>
    );
}

export default SocialsLinks;
