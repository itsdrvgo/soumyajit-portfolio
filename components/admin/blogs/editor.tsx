"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import EditorJS from "@editorjs/editorjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { z } from "zod";
import "@/styles/editor.css";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Blog } from "@/lib/drizzle/schema";
import { Icons } from "@/components/icons/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { postPatchSchema } from "@/lib/validation/blogs";
import axios from "axios";
import { ResponseData } from "@/lib/validation/response";

interface EditorProps {
    blog: Pick<Blog, "id" | "title" | "content" | "published">
}

type FormData = z.infer<typeof postPatchSchema>

export function Editor({ blog }: EditorProps) {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(postPatchSchema),
    });
    const ref = useRef<EditorJS>();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        // @ts-ignore
        const Header = (await import("@editorjs/header")).default;
        // @ts-ignore
        const Embed = (await import("@editorjs/embed")).default;
        // @ts-ignore
        const Table = (await import("@editorjs/table")).default;
        // @ts-ignore
        const List = (await import("@editorjs/list")).default;
        // @ts-ignore
        const Code = (await import("@editorjs/code")).default;
        // @ts-ignore
        const LinkTool = (await import("@editorjs/link")).default;
        // @ts-ignore
        const InlineCode = (await import("@editorjs/inline-code")).default;

        const body = postPatchSchema.parse(blog);

        if (!ref.current) {
            const editor = new EditorJS({
                holder: "editor",
                onReady() {
                    ref.current = editor;
                },
                placeholder: "Type here to write your blog...",
                inlineToolbar: true,
                data: body.content,
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: "http://localhost:3000/api/fetchLink"
                        }
                    },
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed,
                }
            });
        }
    }, [blog]);

    useEffect(() => {
        if (typeof window !== "undefined") setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    async function onSubmit(data: FormData) {
        setIsSaving(true);

        const blocks = await ref.current?.save();

        axios.patch<ResponseData>(`/api/posts/${blog.id}`, {
            title: data.title,
            content: blocks
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }).then(({ data: resData }) => {
            setIsSaving(false);

            if (resData.code !== 200) return toast({
                title: "Oops!",
                description: "Your blog was not saved, try again",
                variant: "destructive",
            });

            router.refresh();
            return toast({
                title: "Hurray!",
                description: "Your blog has been saved",
            });
        }).catch(() => {
            setIsSaving(false);
            return toast({
                title: "Oops!",
                description: "Your blog was not saved, try again",
                variant: "destructive",
            });
        });
    }

    if (!isMounted) return null;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-10">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center space-x-10">
                        <Link
                            href="/admin/blogs"
                            className={cn(buttonVariants({ variant: "ghost" }))}
                        >
                            <>
                                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            {blog.published ? "Published" : "Draft"}
                        </p>
                    </div>
                    <button type="submit" className={cn(buttonVariants())}>
                        {isSaving && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        <span>Save</span>
                    </button>
                </div>
                <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
                    <TextareaAutosize
                        autoFocus
                        id="title"
                        defaultValue={blog.title}
                        placeholder="Post title"
                        className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                        {...register("title")}
                    />
                    <div id="editor" className="min-h-[500px]" />
                    <p className="text-sm text-gray-500">
                        Use{" "}
                        <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
                            Tab
                        </kbd>{" "}
                        to open the command menu.
                    </p>
                </div>
            </div>
        </form>
    );
}