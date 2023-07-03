"use client";

import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Blog } from "@/lib/drizzle/schema";
import Link from "next/link";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { EmptyPlaceholder } from "../ui/empty-placeholder";
import { GoBackButton } from "../global/go-back-button";

function BlogSearch({ data }: { data: Blog[] }) {
    const [searchText, setSearchText] = useState("");
    const [matchingIds, setMatchingIds] = useState<number[]>([]);

    useEffect(() => {
        if (searchText === "") {
            setMatchingIds(data.slice(0, 9).map((blog) => blog.id));
        }
    }, [data, searchText]);

    const handleSearch = (text: string) => {
        setSearchText(text);
        const matching = data.filter((blog) => blog.title.toLowerCase().includes(text.toLowerCase())).map((blog) => blog.id);
        setMatchingIds(matching);
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
                        <Link key={id} href={`/blog/${id}`}>
                            <div className={"border border-gray-500 rounded-md flex flex-col gap-2 items-center h-full overflow-hidden cursor-pointer"}>
                                <Image src={data.find((x) => x.id === id)?.thumbnailUrl ?? "https://cdn.discordapp.com/attachments/1091399104480944158/1124287608990736476/pexels-photo-2426085.webp"} alt={id.toString()} width={500} height={500} className="aspect-video object-cover" />
                                <div className="flex flex-col justify-between w-full gap-2 p-5 h-full">
                                    <p className="font-semibold">{data.find((x) => x.id === id)?.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {formatDate(data.find((x) => x.id === id)?.createdAt.toDateString()!)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
}

export default BlogSearch;