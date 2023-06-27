import { z } from "zod";

export const authSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100)
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character")
});

export const verfifyEmailSchema = z.object({
    code: z
        .string()
        .min(6, "Verification code must be 6 characters long")
        .max(6),
});

export const checkEmailSchema = z.object({
    email: authSchema.shape.email,
});

export const checkUsernameSchema = z.object({
    userame: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .regex(/^\S*$/, "Username must not contain spaces")
});

export const resetPasswordSchema = z
    .object({
        password: authSchema.shape.password,
        confirmPassword: authSchema.shape.password,
        code: verfifyEmailSchema.shape.code,
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });