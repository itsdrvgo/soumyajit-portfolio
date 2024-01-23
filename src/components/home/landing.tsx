"use client";

import SoumyajitMainPicture from "@/public/soumyajit_01_main.jpg";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "../icons/icons";

function Landing({ className, ...props }: DefaultProps) {
    const fadeIn: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const slideLeftToRight: Variants = {
        hidden: {
            x: -100,
        },
        show: {
            x: 0,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
            },
        },
    };

    const slideRightToLeft: Variants = {
        hidden: {
            x: 100,
        },
        show: {
            x: 0,
            transition: {
                duration: 0.5,
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
            {...props}
        >
            <motion.div
                className="flex max-w-6xl flex-col-reverse items-center justify-between gap-10 text-center md:flex-row"
                variants={fadeIn}
                initial="hidden"
                animate="show"
            >
                <motion.div
                    className="flex basis-1/2 flex-col gap-4 md:gap-8"
                    variants={slideLeftToRight}
                    initial="hidden"
                    animate="show"
                    viewport={{ once: true }}
                >
                    <div className="flex flex-col items-start">
                        <p className="pl-1 text-3xl font-semibold md:pl-2 md:text-4xl">
                            Hi, it&apos;s me
                        </p>
                        <h1 className="text-5xl font-bold text-blue-300 md:text-8xl">
                            Soumyajit
                        </h1>
                    </div>

                    <p className="pl-1 text-left text-sm text-gray-400 md:pl-2">
                        An accomplished singer, songwriter, and music producer
                        from India, who loves to create captivating melodies and
                        heartfelt lyrics that blend traditional Indian elements
                        with contemporary sounds. Join me on a transformative
                        musical journey as we explore emotions through
                        enchanting melodies. Welcome to my world of passion and
                        connection between hearts and music.
                    </p>

                    <div className="flex items-center justify-start gap-1 text-blue-400 underline underline-offset-4">
                        <Link
                            href={"/#about"}
                            className="cursor-pointer pl-1 tracking-normal transition-all ease-in-out hover:tracking-wider md:pl-2"
                        >
                            Read More
                        </Link>
                        <Icons.arrowRight className="size-4 cursor-pointer" />
                    </div>
                </motion.div>

                <motion.div
                    variants={slideRightToLeft}
                    initial="hidden"
                    animate="show"
                    viewport={{ once: true }}
                >
                    <Image
                        alt="soumyajit_main"
                        src={SoumyajitMainPicture}
                        height={500}
                        width={500}
                        priority
                        className="pointer-events-none"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
}

export default Landing;
