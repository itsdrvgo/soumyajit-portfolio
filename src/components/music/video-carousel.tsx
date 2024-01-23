"use client";

import { videos } from "@/src/config/videos";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import YouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselProps,
} from "../ui/carousel";

function VideoCarousel({ className, ...props }: CarouselProps & DefaultProps) {
    return (
        <Carousel
            opts={{
                align: "center",
                loop: true,
            }}
            className={cn("w-full", className)}
            {...props}
        >
            <CarouselContent>
                {videos.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3"
                    >
                        <div className="size-full overflow-hidden rounded-xl">
                            <YouTubeEmbed id={item.id} title={item.title} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default VideoCarousel;
