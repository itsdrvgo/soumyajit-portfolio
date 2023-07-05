import { Comment, User } from "@/lib/drizzle/schema";
import { HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { convertMstoTimeElapsed } from "@/lib/utils";

interface PageProps extends HTMLAttributes<HTMLElement> {
    comments: Comment[],
    users: User[]
}

function BlogViewComments({ className, comments, users }: PageProps) {
    return (
        <>
            <div className={className}>
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-4">
                        <Avatar className="h-8 w-8 md:w-10 md:h-10">
                            <AvatarImage src={users.find((x) => x.id === comment.authorId)?.profile_image_url!} alt={users.find((x) => x.id === comment.authorId)?.username ?? "User"} />
                            <AvatarFallback>{(users.find((x) => x.id === comment.authorId)?.username ?? "User").charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="w-full space-y-2 cursor-default">
                            <div className="flex gap-2 items-center">
                                <p className="text-sm md:text-base">@{users.find((x) => x.id === comment.authorId)?.username}</p>
                                <p className="text-xs text-gray-500">{convertMstoTimeElapsed(comment.createdAt.getTime())}</p>
                            </div>
                            <p className="font-light text-sm">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default BlogViewComments;