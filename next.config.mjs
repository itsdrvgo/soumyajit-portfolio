import "./env.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.discordapp.com"]
    },
    reactStrictMode: true
};

export default nextConfig;