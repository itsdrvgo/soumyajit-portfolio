"use client";

import SoumyajitPhoto from "@/public/soumyajit_square.png";
import { cn, wait } from "@/src/lib/utils";
import { DefaultProps } from "@/src/types";
import {
    Avatar,
    Button,
    Link,
    Popover,
    PopoverContent,
    PopoverTrigger,
    useDisclosure,
    User,
} from "@nextui-org/react";
import { useAnimate } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { Icons } from "../../icons/icons";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { videos } from "@/src/config/videos";
import YouTubeEmbed from "react-lite-youtube-embed";

interface NotificationBarProps extends DefaultProps {
    topic?: ReactNode;
}

function NotificationBar({ topic, className, ...props }: NotificationBarProps) {
    const { isOpen, onOpenChange, onClose } = useDisclosure();
    const [scope, animate] = useAnimate();

    useEffect(() => {
        if (!isOpen) return;

        const animator = async () => {
            await animate("#first", {
                opacity: 0,
                x: -20,
            });
            await wait(50);
            await animate("#first", {
                opacity: 1,
                x: 0,
            });

            await wait(50);

            await animate("#second", {
                opacity: 0,
                x: -20,
            });
            await wait(50);
            await animate("#second", {
                opacity: 1,
                x: 0,
            });

            await wait(50);

            await animate("#third", {
                opacity: 0,
                x: -20,
            });
            await wait(50);
            await animate("#third", {
                opacity: 1,
                x: 0,
            });

            await animate("#avatar", {
                opacity: 0,
                x: -20,
            });
            await animate("#avatar", {
                opacity: 1,
                x: 0,
            });
        };

        animator();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <div className={cn("fixed bottom-5 right-5", className)} {...props}>
            <Popover
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                shouldBlockScroll
                placement="top-end"
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        radius="full"
                        color="primary"
                        className={cn(!isOpen && "animate-pulse")}
                        startContent={<Icons.notification className="size-5" />}
                    />
                </PopoverTrigger>
                <PopoverContent className="overflow-hidden p-0">
                    {topic ?? (
                        <div>
                            <div className="flex items-center justify-between gap-20 bg-primary-100 p-3 md:p-5">
                                <User
                                    name="Soumyajit Chakraborty"
                                    description="Musician/Vocalist"
                                    avatarProps={{
                                        src: SoumyajitPhoto.src,
                                        alt: "Soumyajit Chakraborty",
                                        showFallback: true,
                                    }}
                                    classNames={{
                                        description: "text-white/60",
                                    }}
                                />

                                <Button
                                    isIconOnly
                                    radius="full"
                                    color="success"
                                    variant="flat"
                                    className="!size-unit-5 min-w-0 p-1"
                                    startContent={
                                        <Icons.close className="size-3" />
                                    }
                                    onPress={onClose}
                                />
                            </div>

                            <div
                                className="flex items-end gap-1 bg-default-50 p-3 py-5 md:p-5"
                                ref={scope}
                            >
                                <div className="opacity-0" id="avatar">
                                    <Avatar
                                        src={SoumyajitPhoto.src}
                                        alt="Soumyajit Chakraborty"
                                        size="sm"
                                        classNames={{
                                            base: "w-4 h-4",
                                        }}
                                    />
                                </div>

                                <div className="flex flex-col items-start gap-2">
                                    <p
                                        className="max-w-60 rounded-md bg-primary-300 p-2 px-3 opacity-0"
                                        id="first"
                                    >
                                        Hey, Soumyajit here!
                                    </p>
                                    <p
                                        className="max-w-60 rounded-md bg-primary-300 p-2 px-3 opacity-0"
                                        id="second"
                                    >
                                        My new single is out now on YouTube.
                                        Check it out{" "}
                                        <Link
                                            href={`https://www.youtube.com/watch?v=${videos[0].id}`}
                                            underline="always"
                                            color="foreground"
                                            className="text-sm underline-offset-2"
                                            isExternal
                                        >
                                            here
                                        </Link>
                                        .
                                    </p>

                                    <div
                                        className="size-full overflow-hidden rounded-xl opacity-0"
                                        id="third"
                                    >
                                        <YouTubeEmbed
                                            id={videos[0].id}
                                            title={videos[0].title}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default NotificationBar;
