"use client";

import Image from "next/image";
import CanvasBlog from "@/public/canvas_blog_draw.jpg";
import CanvasCourse from "@/public/course_audio.jpeg";
import CanvasUsers from "@/public/database_users.webp";
import CanvasSocialMedia from "@/public/canvas_social_media.jpg";
import { Icons } from "@/components/icons/icons";
import { HTMLAttributes } from "react";
import { useRouter } from "next/navigation";

interface PageProps extends HTMLAttributes<HTMLElement> { }

function AdminButtons({ className }: PageProps) {
    const router = useRouter();

    return (
        <>
            <div className={className}>
                <div
                    className="relative rounded-lg border border-white overflow-hidden h-52 cursor-pointer group bg-zinc-800 p-5"
                    onClick={() => router.push("/admin/blogs")}
                >
                    <Image
                        src={CanvasBlog}
                        alt="blog"
                        className="opacity-50 group-hover:opacity-30 transition-all ease-in-out scale-150"
                        loading="lazy"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl font-medium">
                        <Icons.pencil />
                        <p>Blog Creation Tool</p>
                    </div>
                </div>

                <div
                    className="relative rounded-lg border border-white overflow-hidden h-52 cursor-pointer group bg-zinc-800 p-5"
                    onClick={() => router.push("/admin/courses")}
                >
                    <Image
                        src={CanvasCourse}
                        alt="blog"
                        className="opacity-50 group-hover:opacity-30 transition-all ease-in-out scale-150"
                        loading="lazy"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl font-medium">
                        <Icons.bookopencheck />
                        <p>Course Creation Tool</p>
                    </div>
                </div>

                <div
                    className="relative rounded-lg border border-white overflow-hidden h-52 cursor-pointer group bg-zinc-800 p-5"
                    onClick={() => router.push("/admin/users")}
                >
                    <Image
                        src={CanvasUsers}
                        alt="blog"
                        className="opacity-50 group-hover:opacity-30 transition-all ease-in-out scale-150"
                        loading="lazy"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl font-medium">
                        <Icons.users />
                        <p>Users Panel</p>
                    </div>
                </div>

                <div
                    className="relative rounded-lg border border-white overflow-hidden h-52 cursor-pointer group bg-zinc-800 p-5"
                    onClick={() => router.push("/admin/autopost")}
                >
                    <Image
                        src={CanvasSocialMedia}
                        alt="blog"
                        className="opacity-50 group-hover:opacity-30 transition-all ease-in-out scale-150"
                        loading="lazy"
                    />
                    <div className="flex flex-col items-center justify-center gap-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-xl font-medium">
                        <Icons.globe />
                        <p>Auto Post Tool</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminButtons;