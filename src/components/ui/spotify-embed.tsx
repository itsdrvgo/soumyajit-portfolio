import { cn } from "@/src/lib/utils";
import { DetailedHTMLProps, IframeHTMLAttributes } from "react";

function SpotifyEmbed({
    className,
    src,
    ...props
}: DetailedHTMLProps<
    IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
>) {
    return (
        <iframe
            className={cn("rounded-xl", className)}
            src={src}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            {...props}
        />
    );
}

export default SpotifyEmbed;
