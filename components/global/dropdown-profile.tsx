"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { HTMLAttributes } from "react";
import { User } from "@/lib/drizzle/schema";
import { Icons } from "../icons/icons";

interface CompProps extends HTMLAttributes<HTMLElement> {
    user: User
}

function DropdownProfile({ user, className }: CompProps) {
    const router = useRouter();
    const defaultUserName = "User";

    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex gap-4 cursor-pointer items-center">
                        <Avatar className="border-2 border-slate-700">
                            <AvatarImage src={user.profile_image_url!} alt="avatar" />
                            <AvatarFallback>{(user.username ?? defaultUserName).charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <p>Hi, {user.username ?? defaultUserName}</p>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">

                    <DropdownMenuLabel>My Account</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem onSelect={() => router.push("/profile")} className="cursor-pointer">
                            <Icons.user className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => router.push("/premium")} className="cursor-pointer">
                            <Icons.gem className="mr-2 h-4 w-4" />
                            <span>Pro</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={() => router.push("/logs")} className="cursor-pointer">
                        <Icons.list className="mr-2 h-4 w-4" />
                        <span>Change Logs</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => router.push("/support")} className="cursor-pointer">
                        <Icons.support className="mr-2 h-4 w-4" />
                        <span>Support</span>
                    </DropdownMenuItem>

                    {(user.role === "admin" || user.role === "owner") && (
                        <>
                            <DropdownMenuSeparator />

                            <DropdownMenuGroup>
                                <DropdownMenuItem onSelect={() => router.push("/admin")} className="cursor-pointer">
                                    <Icons.shield className="mr-2 h-4 w-4" />
                                    <span>Admin</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </>
                    )}

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => router.push("/sign-out")} className="cursor-pointer">
                        <Icons.logout className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default DropdownProfile;