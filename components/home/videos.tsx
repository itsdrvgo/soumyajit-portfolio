"use client";

import { HTMLAttributes } from "react";
import { Variants, motion } from "framer-motion";
import { Separator } from "../ui/separator";

function Videos({ className }: HTMLAttributes<HTMLElement>) {
    const crossIn: Variants = {
        hide: {
            opacity: 0
        },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
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
                initial="hide"
                whileInView={"show"}
                viewport={{ once: true }}
                variants={crossIn}
                id="videos"
            >
                <motion.div
                    className="container max-w-[75rem] flex flex-col gap-6 md:gap-8"
                    initial="hide"
                    whileInView={"show"}
                    viewport={{ once: true }}
                    variants={animateUp}
                >
                    <p className="text-3xl md:text-5xl font-semibold">My Videos</p>
                    <Separator className="h-[2px] w-12 bg-blue-300" />
                    <div className="aspect-video bg-gradient-to-br from-zinc-950 via-gray-900 to-black rounded-md p-2 md:p-5 pb-5 md:pb-10 m-0 md:m-5 relative monitor">
                        <div className="w-full h-full bg-black">
                            <iframe src="https://www.youtube.com/embed/rN5ZFAmsNSE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="w-full h-full"></iframe>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
        </>
    );
}

export default Videos;