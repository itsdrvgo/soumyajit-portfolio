import { formatDate } from "@/lib/utils";
import { Blog } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import Image from "next/image";

interface BlogItemProps extends HTMLAttributes<HTMLElement> {
    blog: Pick<Blog, "id" | "title" | "published" | "createdAt" | "thumbnailUrl">
}

export function BlogItem({ blog, className }: BlogItemProps) {
    return (
        <div className={className}>
            <div>
                <Image src={blog.thumbnailUrl ?? "https://cdn.discordapp.com/attachments/1091399104480944158/1124287608990736476/pexels-photo-2426085.webp"} alt={blog.id.toString()} width={500} height={500} className="aspect-video" />
            </div>
            <div className="flex justify-between items-center w-full p-5">
                <div className="grid gap-1">
                    <p className="font-semibold">{blog.title}</p>
                    <p className="text-sm text-muted-foreground">
                        {formatDate(blog.createdAt.toDateString())}
                    </p>
                </div>
            </div>
        </div>
    );
}