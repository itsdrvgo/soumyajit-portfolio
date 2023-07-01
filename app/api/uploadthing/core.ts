import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();

export const customFileRouter = {
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(async () => {
            const user = await currentUser();
            if (!user) throw new Error("Unauthorized!");

            const dbUser = await db.query.users.findFirst({ where: eq(users.id, user.id) });
            if (!dbUser || ["user", "moderator"].includes(dbUser.role)) throw new Error("Unauthorized!");

            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);
        })
} satisfies FileRouter;

export type CustomFileRouter = typeof customFileRouter;