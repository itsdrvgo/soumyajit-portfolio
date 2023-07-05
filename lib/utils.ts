import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";

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

export function formatDate(input: string | number): string {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

export function handleError(err: unknown) {
    if (err instanceof ZodError) return NextResponse.json({
        code: 422,
        message: err.issues.map((x) => x.message).join(", ")
    });
    else if (err instanceof AxiosError) return NextResponse.json({
        code: err.code,
        message: err.message
    });
    else return NextResponse.json({
        code: 500,
        message: "Internal Server Error"
    });
}

export function checkRoleHierarchy(userRole: string, targetRole: string) {
    enum UserRole {
        User = "user",
        Moderator = "moderator",
        Admin = "admin",
        Owner = "owner",
    }

    if (userRole === UserRole.Owner) return true;
    else if (userRole === UserRole.Admin) return targetRole !== UserRole.Owner && targetRole !== UserRole.Admin;
    else if (userRole === UserRole.Moderator) return (
        targetRole !== UserRole.Owner &&
        targetRole !== UserRole.Admin &&
        targetRole !== UserRole.Moderator
    );
    else if (userRole === UserRole.User) return (
        targetRole !== UserRole.Owner &&
        targetRole !== UserRole.Admin &&
        targetRole !== UserRole.Moderator
    );
    else return false;
}

export function convertMstoTimeElapsed(input: number) {
    const currentTimestamp = Date.now();
    const elapsed = currentTimestamp - input;

    if (elapsed < 60000) return "just now";
    else if (elapsed < 3600000) {
        const minutes = Math.floor(elapsed / 60000);
        return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else if (elapsed < 86400000) {
        const hours = Math.floor(elapsed / 3600000);
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
        const days = Math.floor(elapsed / 86400000);
        return `${days} day${days > 1 ? "s" : ""} ago`;
    }
}

export function shortenNumber(num: number): string {
    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;
    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }
    const formattedNum = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
    return formattedNum + units[unitIndex];
}