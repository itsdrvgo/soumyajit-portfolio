"use client";

import { HTMLAttributes } from "react";
import { Variants, motion } from "framer-motion";
import { Spotify } from "react-spotify-embed";
import Image, { StaticImageData } from "next/image";
import sopne_ba_bastobe from "@/public/sopne_ba_bastobe.png";
import amari_ovyesh from "@/public/amari_ovyesh.jpg";
import bekhayali_mon from "@/public/bekhayali_mon.jpg";
import kichu_sopnera from "@/public/kichu_sopnera.jpg";
import tor_kothara from "@/public/tor_kothara.jpg";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";

interface GridSong {
    name: string;
    url: string;
    thumbnail: StaticImageData;
    alt: string;
}

const gridSongs: GridSong[] = [
    { name: "Amari Ovyesh", thumbnail: amari_ovyesh, url: "https://open.spotify.com/track/2bhO8QYI6dsmM68h4uuf7p?si=c9530c0451f44711", alt: "amari_ovyesh" },
    { name: "Bekhayali Mon", thumbnail: bekhayali_mon, url: "https://open.spotify.com/track/2NlMIzDlZlTi2X99U3kbO4?si=3a628e382f064d14", alt: "bekhayali_mon" },
    { name: "Kichu Sopnera", thumbnail: kichu_sopnera, url: "https://open.spotify.com/track/7wtDt3dmEeNjxQMQkMVTGP?si=be2215d7f6e24c1d", alt: "kichu_sopnera" },
    { name: "Tor Kothara", thumbnail: tor_kothara, url: "https://open.spotify.com/track/7MnWBiI9RGjdHEh4f7bgbm?si=68b8ea9d5d5a400d", alt: "tor_kothara" }
];

function Music({ className }: HTMLAttributes<HTMLElement>) {
    const router = useRouter();

    const crossIn: Variants = {
        hide: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const animateUp: Variants = {
        hide: {
            opacity: 0,
            y: 200,
        },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <>
            <motion.section
                className={className}
                initial={"hide"}
                animate={"show"}
                variants={crossIn}
                viewport={{ once: true }}
                id="music"
            >
                <motion.div
                    className="container max-w-[75rem] flex flex-col gap-6 md:gap-8"
                >
                    <p className="text-3xl md:text-5xl font-semibold">My Music</p>
                    <Separator className="h-[2px] w-12 bg-blue-300" />
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
                        initial={"hide"}
                        whileInView={"show"}
                        viewport={{ once: true }}
                        variants={animateUp}
                    >
                        <div
                            className="relative group overflow-hidden song_tab rounded-lg cursor-pointer"
                            onClick={() => router.push("https://open.spotify.com/track/6x2CUb4mZh3nzOaEn9iOdr?si=c939a06a4c784a83")}
                        >
                            <Image src={sopne_ba_bastobe} alt="sopne_ba_bastobe" className="w-full h-full" />
                            <div className="absolute transition-all ease-in-out -bottom-1/2 group-hover:bottom-0 left-0 bg-gray-800 opacity-70 w-full p-2 px-4 uppercase">
                                <p>Sopne Ba Bastobe</p>
                            </div>
                        </div>
                        <div
                            className="grid grid-cols-2 gap-6 md:gap-8"
                        >
                            {gridSongs.map((item, index) => (
                                <div
                                    key={index}
                                    className="relative group overflow-hidden song_tab rounded-lg cursor-pointer"
                                    onClick={() => router.push(item.url)}
                                >
                                    <Image src={item.thumbnail} alt={item.alt} />
                                    <div className="absolute transition-all ease-in-out -bottom-1/2 group-hover:bottom-0 left-0 bg-gray-800 opacity-70 w-full p-2 px-4 uppercase">
                                        <p>{item.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={"hide"}
                        whileInView={"show"}
                        viewport={{ once: true }}
                        variants={animateUp}
                    >
                        <Spotify wide link="https://open.spotify.com/track/6x2CUb4mZh3nzOaEn9iOdr?si=31dc651e0a614ba1" />
                    </motion.div>
                </motion.div>
            </motion.section>
        </>
    );
}

export default Music;