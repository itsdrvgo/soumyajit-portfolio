import MusicCarousel from "@/src/components/music/music-carousel";
import VideoCarousel from "@/src/components/music/video-carousel";

function Page() {
    return (
        <section className="flex justify-center p-5">
            <div className="w-full max-w-6xl space-y-10">
                <div className="space-y-5">
                    <h2 className="text-center text-2xl font-bold md:text-start md:text-3xl">
                        My Music
                    </h2>

                    <MusicCarousel />
                </div>

                <div className="space-y-5">
                    <h2 className="text-center text-2xl font-bold md:text-start md:text-3xl">
                        My Videos
                    </h2>

                    <VideoCarousel />
                </div>
            </div>
        </section>
    );
}

export default Page;
