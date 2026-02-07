import { verify } from "crypto"
import { z } from "zod"

export const registerSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Enter a valid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
})

export type RegisterFormValues = z.infer<typeof registerSchema>


export const verifySchema = z.object({
    code: z
        .string()
        .min(6, "Verification code must be 6 characters")
        .max(6, "Verification code must be 6 characters"),
})

export type VerifyFormValues = z.infer<typeof verifySchema>

export const completeProfileSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required"),
    lastName: z
        .string()
        .min(1, "Last name is required"),
    userName: z
        .string()
        .min(3, "Username must be at least 3 characters"),
    bio: z
        .string()
        .max(160, "Bio must be at most 160 characters"),
})

export type CompleteProfileFormValues = z.infer<typeof completeProfileSchema>