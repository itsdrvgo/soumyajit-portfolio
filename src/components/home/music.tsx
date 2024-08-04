"use client";

import sopne_ba_bastobe from "@/public/sopne_ba_bastobe.png";
import { music, type Music } from "@/src/config/music";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import { Divider, Link } from "@nextui-org/react";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import Image from "next/image";
import { Icons } from "../icons/icons";
import SpotifyEmbed from "../ui/spotify-embed";

function Music({ className, ...props }: DefaultProps) {
    const slideUpContainer: Variants = {
        hidden: {
            y: 200,
            opacity: 0,
        },
        show: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const slideUp: Variants = {
        hidden: {
            y: 100,
        },
        show: {
            y: 0,
            transition: {
                staggerChildren: 0.2,
                ease: "easeInOut",
            },
        },
    };

    return (
        <section
            className={cn(
                "flex h-full min-h-screen cursor-default items-center justify-center p-5",
                className
            )}
            id="music"
            {...props}
        >
            <motion.div
                className="container flex max-w-[75rem] flex-col gap-3 md:gap-6"
                variants={slideUpContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                <p className="text-3xl font-semibold md:text-5xl">My Music</p>

                <Divider className="h-[2px] w-12 bg-blue-300" />

                <motion.div
                    className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6"
                    variants={slideUp}
                >
                    {music.slice(0, 1).map((item, index) => (
                        <MusicCard song={item} key={index} />
                    ))}

                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                        {music
                            .filter((item) => item.alt !== "aaj_na_hoy")
                            .slice(2, 5)
                            .map((item, index) => (
                                <MusicCard song={item} key={index} />
                            ))}

                        <MoreMusicCard song={music[1]} />
                    </div>
                </motion.div>

                <motion.div variants={slideUp}>
                    <SpotifyEmbed src="https://open.spotify.com/embed/track/2KfMgCktlWZm3ULV1Ga6pa?utm_source=generator" />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Music;

interface MusicCardProps extends HTMLMotionProps<"div"> {
    song: Music;
}

function MusicCard({ song, className, ...props }: MusicCardProps) {
    const fadeIn: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    return (
        <motion.div key={song.alt} variants={fadeIn} {...props}>
            <Link
                className={cn(
                    "group relative size-full cursor-pointer overflow-hidden rounded-lg",
                    className
                )}
                color="foreground"
                href={song.url}
                isExternal
            >
                <Image
                    src={
                        song.alt === "swapne_ba_bastobe"
                            ? sopne_ba_bastobe
                            : song.thumbnail
                    }
                    alt={song.alt}
                    width={400}
                    height={400}
                    style={{
                        objectFit: "cover",
                    }}
                    className="size-full"
                />

                <div className="absolute -bottom-1/2 left-0 w-full bg-gray-800/50 p-2 px-4 uppercase transition-all ease-in-out group-hover:bottom-0">
                    <p>{song.name}</p>
                </div>
            </Link>
        </motion.div>
    );
}

function MoreMusicCard({ song, className, ...props }: MusicCardProps) {
    const fadeIn: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

    return (
        <motion.div key={song.alt} variants={fadeIn} {...props}>
            <Link
                className={cn(
                    "group relative cursor-pointer overflow-hidden rounded-lg",
                    className
                )}
                color="foreground"
                href="/music"
            >
                <Image
                    src={song.thumbnail}
                    alt={song.alt}
                    width={400}
                    height={400}
                    style={{
                        objectFit: "cover",
                    }}
                    className="size-full"
                />

                <div className="absolute left-0 top-0 flex size-full flex-col items-center justify-center gap-2 text-white opacity-0 transition-all ease-in-out group-hover:bg-default-50/60 group-hover:opacity-100">
                    <div className="rounded-full bg-white p-4 text-black">
                        <Icons.arrowRight className="size-6" />
                    </div>
                    <p className="text-lg">More</p>
                </div>
            </Link>
        </motion.div>
    );
}
