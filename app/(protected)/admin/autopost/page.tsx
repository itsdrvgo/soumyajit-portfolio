import { Metadata } from "next";
import Maintenance from "@/components/global/maintenance";

export const metadata: Metadata = {
    title: "Auto Post",
    description: "Post automaticlally to your social media from only one platform"
};

function Page() {
    return (
        <>
            <Maintenance />
        </>
    );
}

export default Page;