"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { Icons } from "../icons/icons";
import { Blog, Comment, Like, NewComment, NewLike, User } from "@/lib/drizzle/schema";
import { Separator } from "../ui/separator";
import TextareaAutosize from "react-textarea-autosize";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import axios from "axios";
import { ResponseData } from "@/lib/validation/response";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import BlogViewComments from "./blog-view-comments";
import { env } from "@/env.mjs";

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: { blogId: string },
    blog: Blog,
    comments: Comment[],
    likes: Like[],
    user: User,
    users: User[],
    like: Like | undefined
}

function BlogViewOperations({ className, params, blog, comments, likes, user, users, like }: PageProps) {
    const router = useRouter();
    const { toast } = useToast();

    const [comment, setComment] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [isLiked, setIsLiked] = useState(like ? true : false);
    const [isLiking, setIsLiking] = useState(false);

    useEffect(() => {
        if (comment.length) setIsActive(true);
        else setIsActive(false);
    }, [comment.length]);

    const handleLike = () => {
        setIsLiking(true);

        const body: NewLike = {
            blogId: blog.id,
            userId: user.id
        };

        axios.post<ResponseData>("/api/blogs/likes", JSON.stringify(body))
            .then(({ data: resData }) => {
                setIsLiking(false);

                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: resData.message,
                    variant: "destructive"
                });

                setIsLiked(!isLiked);
                router.refresh();
            }).catch(() => {
                setIsLiking(false);

                toast({
                    title: "Oops!",
                    description: "Internal Server Error, try again later",
                    variant: "destructive"
                });
            });
    };

    const addComment = async () => {
        setIsActive(false);
        setIsPosting(true);

        const body: NewComment = {
            authorId: user.id,
            blogId: blog.id,
            content: comment
        };

        axios.post<ResponseData>("/api/blogs/comments", JSON.stringify(body))
            .then(({ data: resData }) => {
                setIsPosting(false);

                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: resData.message,
                    variant: "destructive"
                });

                setComment("");
                toast({
                    description: "Comment published"
                });

                router.refresh();
            }).catch(() => {
                setIsPosting(false);

                toast({
                    title: "Oops!",
                    description: "Internal Server Error, try again later",
                    variant: "destructive"
                });
            });
    };

    return (
        <>
            <div className={className}>
                <div className="grid grid-cols-3 justify-items-stretch w-full p-2 gap-3 text-gray-400 text-sm cursor-default">
                    <button
                        className="flex gap-2 items-center justify-center"
                        onClick={handleLike}
                        disabled={isLiking}
                    >
                        {isLiking
                            ? <>
                                <Icons.spinner className="h-4 w-4 animate-spin" />
                                Loading
                            </>
                            : isLiked
                                ? (
                                    <>
                                        <Icons.heart className="h-4 w-4 fill-gray-400" />
                                        Liked
                                    </>
                                )
                                : (
                                    <>
                                        <Icons.heart className="h-4 w-4" />
                                        Like
                                    </>
                                )

                        }
                    </button>
                    <button
                        className="flex gap-2 items-center justify-center cursor-pointer"
                        onClick={() => router.push(`/blog/${params.blogId}#comment`)}
                    >
                        <Icons.comment className="h-4 w-4" />
                        Comment
                    </button>
                    <button
                        className="flex gap-2 items-center justify-center cursor-pointer"
                        onClick={() => {
                            navigator.clipboard.writeText(env.NEXT_PUBLIC_APP_URL + "/blog/" + params.blogId);
                            toast({
                                description: "Link has been copied to clipboard"
                            });
                        }}
                    >
                        <Icons.share className="h-4 w-4" />
                        Share
                    </button>
                </div>
                <Separator />
                <div className="w-full space-y-6 pt-5">
                    <p className="font-semibold text-3xl">Comments</p>
                    <div className="flex gap-4">
                        <Avatar>
                            <AvatarImage src={user.profile_image_url!} alt={user.username ?? "User"} />
                            <AvatarFallback>{(user.username ?? "User").charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="w-full space-y-2">
                            <p className="cursor-default">@{user.username}</p>
                            <TextareaAutosize
                                id="comment"
                                disabled={isPosting}
                                placeholder="Add a comment"
                                value={comment}
                                className="text-sm md:text-base min-h-[100px] overflow-hidden w-full bg-zinc-950 rounded-sm border border-gray-700 focus:border-white px-3 py-2 resize-none"
                                onChange={((e) => setComment(e.target.value))}
                            />
                            <div className="flex justify-end items-center gap-2">
                                <Button
                                    variant={"secondary"}
                                    size={"sm"}
                                    disabled={!isActive}
                                    onClick={() => setComment("")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size={"sm"}
                                    disabled={!isActive}
                                    onClick={addComment}
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </div>

                    <BlogViewComments comments={comments} users={users} className="space-y-6" />
                </div>
            </div>
        </>
    );
}

export default BlogViewOperations;