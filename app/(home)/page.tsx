import About from "@/components/home/about";
import Landing from "@/components/home/landing";
import Music from "@/components/home/music";
import Videos from "@/components/home/videos";

function Page() {
    return (
        <>
            <Landing className="pb-8 pt-0 md:pt-6 min-h-[calc(100vh-5rem)] flex gap-60 flex-col items-center mb-10 md:mb-20" />
            <About className="pb-8 pt-0 md:pt-6 min-h-screen flex gap-60 flex-col items-center mb-10 md:mb-20" />
            <Music className="pb-8 pt-0 md:pt-6 min-h-screen flex gap-60 flex-col items-center mb-10 md:mb-20" />
            <Videos className="pb-8 pt-0 md:pt-6 flex gap-60 flex-col items-center mb-10 md:mb-20" />
        </>
    );
}

export default Page;