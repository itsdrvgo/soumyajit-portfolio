import AdminButtons from "@/components/admin/admin-tab-buttons";
import FAQAccordian from "@/components/admin/faq-accordian";
import { Separator } from "@/components/ui/separator";

function Page() {
    return (
        <>
            <section className={"space-y-24 pb-8 pt-0 md:pt-16 min-h-[calc(100vh-5rem)] mb-10 md:mb-20 container max-w-[75rem]"}>
                <div className="space-y-16">
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-4xl font-bold">Admin Panel</p>
                        <p className="text-gray-400">Manage your components from here</p>
                    </div>
                    <AdminButtons className="container w-full grid grid-cols-1 md:grid-cols-2 justify-items-stretch items-center gap-10 text-center" />
                </div>
                <div className="space-y-4">
                    <p className="text-4xl font-bold">F.A.Q.</p>
                    <Separator className="h-[2px] w-12 bg-blue-300" />
                    <FAQAccordian className="w-full" />
                </div>
            </section>
        </>
    );
}

export default Page;