import { db } from "@/lib/drizzle";
import { users } from "@/lib/drizzle/schema";
import UserTable from "./user-data-table";
import { HTMLAttributes } from "react";

interface PageProps extends HTMLAttributes<HTMLElement> { }

async function UserPage({ className }: PageProps) {
    const data = await db.select().from(users);

    return (
        <UserTable className={className} data={data} />
    );
}

export default UserPage;