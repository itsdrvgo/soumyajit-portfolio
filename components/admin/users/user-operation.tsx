"use client";

import { DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/drizzle/schema";
import { ResponseData } from "@/lib/validation/response";
import { UserDeleteData, UserRoleUpdateData } from "@/lib/validation/users";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLElement> {
    rowData: User,
}

function UserOperation({ rowData }: PageProps) {
    const { user } = useUser();

    const { toast } = useToast();
    const router = useRouter();

    const handleUserDelete = () => {
        const body: UserDeleteData = {
            userId: rowData.id
        };

        axios.post<ResponseData>("/api/users/delete/manual", JSON.stringify(body))
            .then(({ data: resData }) => {
                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: resData.message,
                    variant: "destructive"
                });

                toast({
                    title: "Hurray!",
                    description: "User has been deleted"
                });

                router.refresh();
            }).catch(() => {
                toast({
                    title: "Oops!",
                    description: "Internal Server Error, try again later",
                    variant: "destructive"
                });
            });
    };

    const handleUserRole = (action: UserRoleUpdateData["action"]) => {
        const body: UserRoleUpdateData = {
            role: rowData.role,
            userId: rowData.id,
            action
        };

        axios.post<ResponseData>("/api/users/update/manual", JSON.stringify(body))
            .then(({ data: resData }) => {
                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: resData.message,
                    variant: "destructive"
                });

                toast({
                    title: "Hurray!",
                    description: "User role has been updated"
                });

                router.refresh();
            }).catch(() => {
                toast({
                    title: "Oops!",
                    description: "Internal Server Error, try again later",
                    variant: "destructive"
                });
            });
    };

    return (
        <>
            {rowData.role !== "owner"
                ? <>
                    <DropdownMenuSeparator />
                    {rowData.role === "user"
                        ? <DropdownMenuItem
                            className="cursor-pointer"
                            onSelect={() => handleUserRole("promote")}
                        >
                            Promote
                        </DropdownMenuItem>
                        : rowData.role === "moderator"
                            ? <>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={() => handleUserRole("promote")}
                                >
                                    Promote
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={() => handleUserRole("demote")}
                                >
                                    Demote
                                </DropdownMenuItem>
                            </>
                            : rowData.role === "admin"
                                ? <DropdownMenuItem
                                    className="cursor-pointer"
                                    onSelect={() => handleUserRole("demote")}
                                >
                                    Demote
                                </DropdownMenuItem>
                                : null
                    }
                </>
                : null
            }
            {rowData.id !== user?.id
                ? <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onSelect={handleUserDelete}
                        >
                        Delete User
                    </DropdownMenuItem>
                </>
                : null
            }
        </>
    );
}

export default UserOperation;