"use client";

import Image from "next/image";
import { HTMLAttributes } from "react";
import SoumyajitMainPicture from "@/public/soumyajit_01_main.jpg";
import { Icons } from "../icons/icons";
import { Variants, motion } from "framer-motion";

function Landing({ className }: HTMLAttributes<HTMLElement>) {
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

    const imageAnimation: Variants = {
        hide: {
            opacity: 0,
            x: 30
        },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const textAnimation: Variants = {
        hide: {
            opacity: 0,
            x: -30
        },
        show: {
            opacity: 1,
            x: 0,
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
                animate="show"
                variants={crossIn}
            >
                <motion.div
                    className="container max-w-[75rem] grid grid-cols-1 md:grid-cols-2 justify-items-stretch items-center gap-10 text-center"
                    initial="hide"
                    animate="show"
                    variants={crossIn}
                >
                    <motion.div
                        className="flex flex-col gap-8 order-1 md:order-none"
                        initial="hide"
                        animate="show"
                        variants={crossIn}
                    >
                        <motion.div
                            className="flex flex-col items-start"
                            initial="hide"
                            animate="show"
                            variants={textAnimation}
                        >
                            <p className="text-3xl md:text-4xl font-semibold pl-1 md:pl-2">Hi, it&apos;s me</p>
                            <p className="text-5xl md:text-8xl font-bold text-blue-300">Soumyajit</p>
                        </motion.div>
                        <motion.div
                            initial="hide"
                            animate="show"
                            variants={textAnimation}
                        >
                            <p className="text-gray-400 text-sm text-left pl-1 md:pl-2">An accomplished singer, songwriter, and music producer from India, who loves to create captivating melodies and heartfelt lyrics that blend traditional Indian elements with contemporary sounds. Join me on a transformative musical journey as we explore emotions through enchanting melodies. Welcome to my world of passion and connection between hearts and music.</p>
                        </motion.div>
                        <motion.div
                            className="flex items-center justify-start gap-1 underline underline-offset-4 text-blue-400"
                            initial="hide"
                            animate="show"
                            variants={textAnimation}
                        >
                            <p className="tracking-normal hover:tracking-wider transition-all ease-in-out cursor-pointer pl-1 md:pl-2">Read More</p>
                            <Icons.arrowRight className="h-4 w-4 cursor-pointer" />
                        </motion.div>
                    </motion.div>
                    <motion.div
                        initial="hide"
                        animate="show"
                        variants={imageAnimation}
                    >
                        <Image
                            alt="soumyajit_main"
                            src={SoumyajitMainPicture}
                            height={500}
                            width={500}
                            priority
                        />
                    </motion.div>
                </motion.div>
            </motion.section>
        </>
    );
}

export default Landing;