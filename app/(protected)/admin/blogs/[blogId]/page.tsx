import { Suspense } from "react";
import { Metadata } from "next";
import BlogEditPage from "@/components/admin/blogs/blog-edit-page";

export const metadata: Metadata = {
    title: "New Blog",
    description: "Create a new blog"
};

interface EditorPageProps {
    params: { blogId: string }
}

async function Page({ params }: EditorPageProps) {
    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-10 mb-10 md:mb-20 container max-w-[75rem]"}>
                <BlogEditPage params={params} />
            </section>
        </>
    );
}

export default Page;