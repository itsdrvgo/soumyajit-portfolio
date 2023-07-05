"use client";

import { Icons } from "@/components/icons/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Blog, User } from "@/lib/drizzle/schema";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import { Mdx } from "@/components/md/mdx-components";
import { UploadButton } from "@/components/global/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import "@uploadthing/react/styles.css";
import Image from "next/image";
import axios from "axios";
import { BlogPatchData } from "@/lib/validation/blogs";
import { ResponseData } from "@/lib/validation/response";

interface PageProps extends HTMLAttributes<HTMLElement> {
    params: {
        blogId: string;
    },
    data: Blog,
    user: User
}

function BlogWriteUp({ className, params, data, user }: PageProps) {
    const router = useRouter();
    const { toast } = useToast();

    const [isSaving, setIsSaving] = useState(false);
    const [previewEnabled, setPreviewEnable] = useState(false);
    const [blogTitle, setBlogTitle] = useState(data.title);
    const [blogContent, setBlogContent] = useState(data.content ?? "");
    const [thumbnailURL, setThumbnailURL] = useState(data.thumbnailUrl);

    const handleSave = () => {
        setIsSaving(true);

        const body: BlogPatchData = {
            thumbnailUrl: thumbnailURL,
            title: blogTitle,
            content: blogContent,
            published: data.published,
            action: "edit"
        };

        axios.patch<ResponseData>(`/api/blogs/${data.id}`, JSON.stringify(body))
            .then(({ data: resData }) => {
                setIsSaving(false);

                if (resData.code !== 200) return toast({
                    title: "Oops!",
                    description: resData.message,
                    variant: "destructive"
                });

                toast({
                    title: "Hurray!",
                    description: "Blog has been saved",
                });

                router.push("/admin/blogs");
            }).catch(() => {
                setIsSaving(false);

                toast({
                    title: "Oops!",
                    description: "Internal Server Error, try again later",
                    variant: "destructive"
                });
            });
    };

    return (
        <>
            <div className="flex flex-col w-full gap-10 relative">
                {previewEnabled
                    ? <div className="flex gap-4 flex-col w-full">
                        <p className="text-2xl md:text-5xl font-bold">{blogTitle}</p>
                        <Separator className="w-full" />
                        <div className="flex gap-3 text-xs items-center md:text-sm">
                            <Avatar>
                                <AvatarImage src={user.profile_image_url!} alt={user.username ?? "User"} />
                                <AvatarFallback>{(user.username ?? "User").charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p>@{user.username ?? "User"}</p>
                                <p className="text-gray-400">Published on {formatDate(Date.now())}</p>
                            </div>
                        </div>
                        {thumbnailURL
                            ? <Image src={thumbnailURL} alt="thumbnail" width={2000} height={2000} className="rounded w-full h-full" />
                            : null
                        }
                        <Mdx
                            className="prose prose-lg max-w-full text-white text-sm md:text-base"
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[
                                rehypeKatex, rehypeSlug,
                                [
                                    rehypePrettyCode,
                                    {
                                        theme: "github-dark",
                                        onVisitLine(node: any) {
                                            if (node.children.length === 0) {
                                                node.children = [{ type: "text", value: " " }];
                                            }
                                        },
                                        onVisitHighlightedLine(node: any) {
                                            node.properties.className.push("line--highlighted");
                                        },
                                        onVisitHighlightedWord(node: any) {
                                            node.properties.className = ["word--highlighted"];
                                        },
                                    },
                                ],
                                [
                                    rehypeAutolinkHeadings,
                                    {
                                        properties: {
                                            className: ["subheading-anchor"],
                                            ariaLabel: "Link to section",
                                        },
                                    },
                                ],
                            ]}
                        >
                            {blogContent}
                        </Mdx>
                        <Separator className="w-full" />
                    </div>
                    : <div className="mx-auto w-full flex flex-col gap-4">
                        <Input
                            defaultValue={blogTitle}
                            placeholder="Blog Title"
                            className="text-2xl md:text-5xl h-auto font-bold bg-zinc-950 rounded-sm border border-white"
                            onChange={(e) => setBlogTitle(e.target.value)}
                        />
                        <div className="rounded-sm border border-white flex flex-col md:flex-row gap-4 md:gap-20 p-5 items-center justify-center px-3 h-auto bg-zinc-950">
                            <div className="flex flex-col justify-center items-center gap-2">
                                <p className="text-lg font-semibold">Upload Thumbnail</p>
                                <UploadButton
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        if (!res) return toast({
                                            title: "Oops!",
                                            description: "Error uploading your image",
                                            variant: "destructive"
                                        });

                                        setThumbnailURL(res[0].fileUrl);
                                        toast({
                                            title: "Hurray!",
                                            description: "Upload complete"
                                        });
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast({
                                            title: "Oops!",
                                            description: error.message,
                                            variant: "destructive"
                                        });
                                    }}
                                />
                            </div>
                            {thumbnailURL
                                ? <Image src={thumbnailURL} alt="thumbnail" width={500} height={500} className="rounded" />
                                : null
                            }
                        </div>
                        <TextareaAutosize
                            autoFocus
                            defaultValue={blogContent}
                            placeholder="Type here to write your blog"
                            className="text-sm md:text-base min-h-[300px] overflow-hidden bg-zinc-950 rounded-sm border border-white px-3 py-2 resize-none"
                            onChange={(e) => setBlogContent(e.target.value)}
                        />
                        <p className="text-sm text-gray-500">
                            Use general markdown syntax
                        </p>
                    </div>
                }
                <div className="flex w-full items-center justify-center gap-2">
                    <Button
                        onClick={handleSave}
                    >
                        {isSaving
                            ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            : <Icons.document className="mr-2 h-4 w-4" />
                        }
                        <span>
                            {data.published
                                ? "Save & Publish"
                                : "Save as Draft"
                            }
                        </span>
                    </Button>
                </div>
                <Button
                    variant={"secondary"}
                    type="button"
                    onClick={() => setPreviewEnable(!previewEnabled)}
                    className="fixed top-[5rem] right-0 w-min bg-gray-800 hover:bg-gray-900 rounded-r-none"
                >
                    {isSaving
                        ? <Icons.spinner className="h-4 w-4 animate-spin" />
                        : previewEnabled
                            ? <Icons.view className="h-4 w-4" />
                            : <Icons.hide className="h-4 w-4" />
                    }
                </Button>
            </div >
        </>
    );
}

export default BlogWriteUp;