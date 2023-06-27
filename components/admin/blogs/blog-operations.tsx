"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons/icons";
import { Blog } from "@/lib/drizzle/schema";
import axios from "axios";
import { ResponseData } from "@/lib/validation/response";
import { useState } from "react";

async function deleteBlog(blogId: number) {
    try {
        const { data: resData } = await axios.delete<ResponseData>(`/api/blogs/${blogId}`);
        if (resData.code !== 204) {
            toast({
                title: "Oops!",
                description: "Your blog was not deleted, try again later",
                variant: "destructive"
            });
            return false;
        }

        toast({
            title: "Hurray!",
            description: "Blog has been deleted"
        });
        return true;
    } catch (err) {
        toast({
            title: "Oops!",
            description: "Your blog was not deleted, try again later",
            variant: "destructive"
        });
        return false;
    }
}

interface BlogOperationsProps {
    blog: Pick<Blog, "id" | "title">
}

export function BlogOperations({ blog }: BlogOperationsProps) {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                    <Icons.ellipsis className="h-4 w-4" />
                    <span className="sr-only">Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                        <Link href={`/admin/blogs/${blog.id}`} className="flex w-full">
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to delete this blog?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event: any) => {
                                event.preventDefault();
                                setIsDeleteLoading(true);

                                const deleted = await deleteBlog(blog.id);
                                if (deleted) {
                                    setIsDeleteLoading(false);
                                    setShowDeleteAlert(false);
                                    router.refresh();
                                } else {
                                    setIsDeleteLoading(false);
                                    setShowDeleteAlert(false);
                                }
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isDeleteLoading
                                ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                : <Icons.trash className="mr-2 h-4 w-4" />
                            }
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}