import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateRandomId(length?: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (!length) length = 16;
    const bytes = crypto.randomBytes(length);
    const result: string[] = [];

    for (let i = 0; i < length; i++) {
        const index = bytes[i] % characters.length;
        result.push(characters[index]);
    }

    return result.join("");
}

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));