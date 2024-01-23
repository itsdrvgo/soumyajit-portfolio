"use client";

import amari_ovyesh from "@/public/amari_ovyesh.jpg";
import bekhayali_mon from "@/public/bekhayali_mon.jpg";
import kichu_sopnera from "@/public/kichu_sopnera.jpg";
import sopne_ba_bastobe from "@/public/sopne_ba_bastobe.png";
import tor_kothara from "@/public/tor_kothara.jpg";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import { Divider, Link } from "@nextui-org/react";
import { HTMLMotionProps, motion, Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { Icons } from "../icons/icons";
import SpotifyEmbed from "../ui/spotify-embed";

interface Song {
    name: string;
    url: string;
    thumbnail: StaticImageData;
    alt: string;
}

const songs: Song[] = [
    {
        name: "Sopne Ba Bastobe",
        thumbnail: sopne_ba_bastobe,
        url: "https://open.spotify.com/track/6x2CUb4mZh3nzOaEn9iOdr?si=31dc651e0a614ba1",
        alt: "sopne_ba_bastobe",
    },
    {
        name: "Amari Ovyesh",
        thumbnail: amari_ovyesh,
        url: "https://open.spotify.com/track/2bhO8QYI6dsmM68h4uuf7p?si=c9530c0451f44711",
        alt: "amari_ovyesh",
    },
    {
        name: "Bekhayali Mon",
        thumbnail: bekhayali_mon,
        url: "https://open.spotify.com/track/2NlMIzDlZlTi2X99U3kbO4?si=3a628e382f064d14",
        alt: "bekhayali_mon",
    },
    {
        name: "Kichu Sopnera",
        thumbnail: kichu_sopnera,
        url: "https://open.spotify.com/track/7wtDt3dmEeNjxQMQkMVTGP?si=be2215d7f6e24c1d",
        alt: "kichu_sopnera",
    },
    {
        name: "Tor Kothara",
        thumbnail: tor_kothara,
        url: "https://open.spotify.com/track/7MnWBiI9RGjdHEh4f7bgbm?si=68b8ea9d5d5a400d",
        alt: "tor_kothara",
    },
];

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
                    {songs.slice(0, 1).map((item, index) => (
                        <MusicCard song={item} key={index} />
                    ))}

                    <div className="grid grid-cols-2 gap-3 md:gap-6">
                        {songs.slice(1, 4).map((item, index) => (
                            <MusicCard song={item} key={index} />
                        ))}

                        <MoreMusicCard song={songs[4]} />
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
    song: Song;
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
                    "group relative cursor-pointer overflow-hidden rounded-lg",
                    className
                )}
                color="foreground"
                href={song.url}
                isExternal
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
