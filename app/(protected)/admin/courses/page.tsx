import { Metadata } from "next";
import Maintenance from "@/components/global/maintenance";

export const metadata: Metadata = {
    title: "Course Panel",
    description: "Manager your courses"
};

function Page() {
    return (
        <>
            <Maintenance />
        </>
    );
}

export default Page;