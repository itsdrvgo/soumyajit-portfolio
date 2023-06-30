"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons/icons";
import { Blog } from "@/lib/drizzle/schema";
import axios from "axios";
import { ResponseData } from "@/lib/validation/response";
import { useState } from "react";
import { BlogPatchData } from "@/lib/validation/blogs";

interface BlogOperationsProps {
    blog: Pick<Blog, "id" | "title" | "published" | "thumbnailUrl">
}

export function BlogOperations({ blog }: BlogOperationsProps) {
    const router = useRouter();
    const { toast } = useToast();

    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);
    const [showPublishAlert, setShowPublishAlert] = useState<boolean>(false);
    const [isPublishLoading, setIsPublishLoading] = useState<boolean>(false);

    const deleteBlog = () => {
        setIsPublishLoading(true);

        axios.delete<ResponseData>(`/api/blogs/${blog.id}`)
            .then(({ data: resData }) => {
                setIsDeleteLoading(false);
                setShowDeleteAlert(false);

                if (resData.code !== 204) return toast({
                    title: "Oops!",
                    description: "Blog was not deleted, try again later",
                    variant: "destructive"
                });

                toast({
                    title: "Hurray!",
                    description: "Blog has been deleted"
                });

                router.refresh();
            }).catch(() => {
                setIsDeleteLoading(false);
                setShowDeleteAlert(false);

                toast({
                    title: "Oops!",
                    description: "Blog was not deleted, try again later",
                    variant: "destructive"
                });
            });
    };

    const publishBlog = () => {
        setIsPublishLoading(true);

        if (!blog.thumbnailUrl || !blog.thumbnailUrl.length) return toast({
            title: "Oops!",
            description: "Blog must have a thumbnail",
            variant: "destructive"
        });

        const body: BlogPatchData = {
            ...blog,
            published: true
        };

        axios.patch<ResponseData>(`/api/blogs/${blog.id}`, JSON.stringify(body))
            .then(({ data: resData }) => {
                setIsPublishLoading(false);
                setShowPublishAlert(false);

                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: "Blog was not published, try again later",
                    variant: "destructive"
                });

                toast({
                    title: "Hurray!",
                    description: "Blog has been published"
                });

                router.refresh();
            }).catch(() => {
                setIsPublishLoading(false);
                setShowPublishAlert(false);

                toast({
                    title: "Oops!",
                    description: "Blog was not published, try again later",
                    variant: "destructive"
                });
            });
    };

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
                    <DropdownMenuItem
                        className="flex cursor-pointer items-center"
                        onSelect={() => setShowPublishAlert(true)}
                    >
                        Publish
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
                        <AlertDialogAction onClick={deleteBlog}>
                            {isDeleteLoading
                                ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                : <Icons.trash className="mr-2 h-4 w-4" />
                            }
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <AlertDialog open={showPublishAlert} onOpenChange={setShowPublishAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to publish this blog?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            You still will be able to update this blog anytime you want.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={publishBlog}>
                            {isPublishLoading
                                ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                : <Icons.pencil className="mr-2 h-4 w-4" />
                            }
                            <span>Publish it!</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}