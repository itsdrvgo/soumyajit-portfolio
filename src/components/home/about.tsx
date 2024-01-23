"use client";

import SoumyajitMain02 from "@/public/soumyajit_02_main.jpg";
import { cn } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import { Divider } from "@nextui-org/react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

function About({ className, ...props }: DefaultProps) {
    const fadeIn: Variants = {
        hidden: {
            opacity: 0,
        },
        show: {
            opacity: 1,
        },
    };

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

    return (
        <section
            id="about"
            className={cn(
                "flex h-full min-h-screen cursor-default items-center justify-center p-5",
                className
            )}
            {...props}
        >
            <motion.div
                className="flex max-w-6xl flex-col md:flex-row md:justify-between md:gap-10"
                variants={slideUpContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
            >
                <motion.div className="basis-1/2" variants={fadeIn}>
                    <Image
                        src={SoumyajitMain02}
                        alt="soumyajit_main_02"
                        className="pointer-events-none"
                    />
                </motion.div>

                <motion.div className="basis-1/2 space-y-7 rounded-xl bg-gradient-to-b from-transparent to-secondary-50 p-10 pl-5 md:bg-gradient-to-r">
                    <motion.div className="space-y-2 md:mt-10">
                        <h2 className="text-2xl font-semibold md:text-4xl">
                            About Me
                        </h2>

                        <Divider className="h-[2px] w-12 bg-blue-300" />
                    </motion.div>

                    <motion.div className="space-y-7">
                        <motion.p className="text-lg">
                            Hi, I&apos;m Soumyajit Chakraborty, a globetrotting
                            musician on a quest to explore the world through
                            music.
                        </motion.p>
                        <motion.div className="space-y-3 text-sm font-light text-gray-300 md:text-base">
                            <motion.p>
                                Inspired by the rich tapestry of Bengali
                                culture, my musical odyssey began right here in
                                India, where I studied and currently reside. My
                                journey originated on YouTube and through
                                performances in my local community, where my
                                talent started to blossom.
                            </motion.p>
                            <motion.p>
                                Driven by a deep love for music, I channel my
                                creativity into crafting melodies that reflect
                                my unique perspective. Through my compositions,
                                I aim to evoke emotions and connect with
                                listeners on a profound level.
                            </motion.p>
                            <motion.p>
                                Join me as I embark on this musical adventure,
                                drawing inspiration from my Bengali roots and
                                the experiences that have shaped my artistic
                                expression. Together, let&apos;s celebrate the
                                beauty of music and the power it holds to
                                transcend boundaries.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}

export default About;
