"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Blog } from "@/lib/drizzle/schema";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { formatDate, shortenNumber } from "@/lib/utils";
import { EmptyPlaceholder } from "../ui/empty-placeholder";
import { GoBackButton } from "../global/go-back-button";
import { Icons } from "../icons/icons";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ViewUpdateData } from "@/lib/validation/blogs";
import { ResponseData } from "@/lib/validation/response";

function BlogSearch({ blogData }: { blogData: Blog[] }) {
    const router = useRouter();
    const [searchText, setSearchText] = useState("");
    const [matchingIds, setMatchingIds] = useState<number[]>([]);

    useEffect(() => {
        if (searchText === "") {
            setMatchingIds(blogData.slice(0, 9).map((blog) => blog.id));
        }
    }, [blogData, searchText]);

    const handleSearch = (text: string) => {
        setSearchText(text);
        const matching = blogData.filter((blog) => blog.title.toLowerCase().includes(text.toLowerCase())).map((blog) => blog.id);
        setMatchingIds(matching);
    };

    const handleViewUpdate = (id: number) => {
        router.push(`/blog/${id}`);

        const body: ViewUpdateData = {
            blogId: id,
        };

        axios.post<ResponseData>("/api/blogs/views", JSON.stringify(body))
            .then(({ data: resData }) => {
                if (resData.code !== 200) return console.log(resData.message);
                console.log("Updated view");
            }).catch(() => {
                console.log("Couldn't update view");
            });
    };

    return (
        <>
            <Input
                type="search"
                placeholder="Enter the Blog Title here"
                className="h-14 p-4"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <Separator />
            {searchText !== "" && matchingIds.length === 0 ? (
                <EmptyPlaceholder>
                    <EmptyPlaceholder.Icon name="document" />
                    <EmptyPlaceholder.Title>No blogs found</EmptyPlaceholder.Title>
                    <EmptyPlaceholder.Description>
                        Seems like Soumyajit has not posted any blogs with this name.
                    </EmptyPlaceholder.Description>
                    <GoBackButton />
                </EmptyPlaceholder>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 justify-items-stretch gap-5">
                    {matchingIds.map((id) => (
                        <div key={id} className={"border border-gray-500 rounded-md flex flex-col gap-2 items-center h-full overflow-hidden"}>
                            <div
                                className="cursor-pointer"
                                onClick={() => handleViewUpdate(id)}
                            >
                                <Image src={blogData.find((x) => x.id === id)?.thumbnailUrl ?? "https://cdn.discordapp.com/attachments/1091399104480944158/1124287608990736476/pexels-photo-2426085.webp"} alt={id.toString()} width={500} height={500} className="aspect-video object-cover" />
                                <div className="flex flex-col justify-between w-full gap-2 p-5">
                                    <p className="font-semibold">{blogData.find((x) => x.id === id)?.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(blogData.find((x) => x.id === id)?.createdAt.toDateString()!)}
                                    </p>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-3 justify-items-stretch w-full p-1 pb-3 text-gray-400 text-sm cursor-default">
                                <div className="flex gap-2 items-center justify-center">
                                    <Icons.heart
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleViewUpdate(id)}
                                    />
                                    {shortenNumber(blogData.find((x) => x.id === id)?.likes!)}
                                </div>
                                <button className="flex gap-2 items-center justify-center" >
                                    <Icons.comment
                                        className="h-4 w-4 cursor-pointer"
                                        onClick={() => handleViewUpdate(id)}
                                    />
                                    {shortenNumber(blogData.find((x) => x.id === id)?.commentsCount!)}
                                </button>
                                <div className="flex gap-2 items-center justify-center">
                                    <Icons.analytics className="h-4 w-4" />
                                    {shortenNumber(blogData.find((x) => x.id === id)?.views!)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default BlogSearch;