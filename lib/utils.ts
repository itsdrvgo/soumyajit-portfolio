import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { AxiosError } from "axios";
import { isClerkAPIResponseError } from "@clerk/nextjs";

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
    else if (isClerkAPIResponseError(err)) return NextResponse.json({
        code: err.status,
        message: err.message
    });
    else return NextResponse.json({
        code: 500,
        message: "Internal Server Error"
    });
}

enum UserRole {
    User = "user",
    Moderator = "moderator",
    Admin = "admin",
    Owner = "owner",
}

export function checkRoleHierarchy(userRole: string, targetRole: string) {
    const rolesHierarchy: UserRole[] = [
        UserRole.User,
        UserRole.Moderator,
        UserRole.Admin,
        UserRole.Owner,
    ];

    const userRoleIndex = rolesHierarchy.indexOf(userRole as UserRole);
    const targetRoleIndex = rolesHierarchy.indexOf(targetRole as UserRole);

    return userRoleIndex > targetRoleIndex;
}