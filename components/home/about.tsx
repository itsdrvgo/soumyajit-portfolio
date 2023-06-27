"use client";

import Image from "next/image";
import { HTMLAttributes } from "react";
import SoumyajitMain02 from "@/public/soumyajit_02_main.jpg";
import { Variants, motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

function About({ className }: HTMLAttributes<HTMLElement>) {
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
                id="about"
            >
                <motion.div
                    className="container max-w-[75rem] grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-24"
                    initial="hide"
                    whileInView={"show"}
                    viewport={{ once: true }}
                    variants={animateUp}
                >
                    <Image src={SoumyajitMain02} alt="soumyajit_main_02" />
                    <Card className="order-1 pt-10 pb-5 bg-gradient-to-b md:bg-gradient-to-r from-black to-slate-900 border-none">
                        <CardHeader>
                            <CardTitle className="text-4xl">About Me</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-7">
                            <Separator className="h-[2px] w-12 bg-blue-300" />
                            <p className="font-normal text-lg">Hi, I&apos;m Soumyajit Chakraborty, a globetrotting musician on a quest to explore the world through music.</p>
                            <div className="space-y-3 font-light text-gray-300">
                                <p>Inspired by the rich tapestry of Bengali culture, my musical odyssey began right here in India, where I studied and currently reside. My journey originated on YouTube and through performances in my local community, where my talent started to blossom.</p>
                                <p>Driven by a deep love for music, I channel my creativity into crafting melodies that reflect my unique perspective. Through my compositions, I aim to evoke emotions and connect with listeners on a profound level.</p>
                                <p>Join me as I embark on this musical adventure, drawing inspiration from my Bengali roots and the experiences that have shaped my artistic expression. Together, let&apos;s celebrate the beauty of music and the power it holds to transcend boundaries.</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.section>
        </>
    );
}

export default About;