"use client";

import { music } from "@/src/config/music";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import { Image, Link } from "@nextui-org/react";
import NextImage from "next/image";
import { Icons } from "../icons/icons";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselProps,
} from "../ui/carousel";

function MusicCarousel({ className, ...props }: CarouselProps & DefaultProps) {
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
                {music.map((item, index) => (
                    <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/4"
                    >
                        <div className="group relative size-full overflow-hidden rounded-xl">
                            <Image
                                as={NextImage}
                                src={item.thumbnail}
                                alt={item.alt}
                                width={500}
                                height={500}
                                classNames={{
                                    img: "object-cover",
                                    wrapper: "size-full",
                                }}
                            />

                            <div className="absolute left-0 top-0 z-10 flex size-full items-center justify-center bg-default-50/60 opacity-0 transition-all ease-in-out group-hover:opacity-100">
                                <Link
                                    href={item.url}
                                    isExternal
                                    color="foreground"
                                    className="flex items-center gap-1 rounded-md bg-white px-4 py-2 font-medium text-black hover:opacity-100"
                                >
                                    <Icons.podcast className="size-4" />
                                    <p>Stream</p>
                                </Link>
                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}

export default MusicCarousel;
