import { z } from "zod";
import { Types } from "mongoose";

// Common schemas
export const usernameSchema = z
    .string()
    .trim()
    .toLowerCase()
    .min(6, "Username must be at least 6 characters")
    .max(12, "Username must not exceed 12 characters")
    .regex(
        /^[a-z0-9]+$/,
        "Username can only contain lowercase letters and numbers"
    )
    .transform((value) => value.toLowerCase());

export const emailSchema = z
    .string()
    .trim()
    .min(6, "Email must be at least 6 characters")
    .max(100, "Email must not exceed 100 characters")
    .email("Please provide a valid email address")
    .refine((value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value.trim());
    }, "Please provide a valid email address");

export const passwordSchema = z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
        "Password must be at least 8 characters, includes at least one uppercase letter, one lowercase letter, one number, and one special character."
    );

export const useridSchema = z
    .string()
    .trim()
    .refine(
        (value) => Types.ObjectId.isValid(value),
        "Please provide a valid user id"
    );

export const otpSchema = z
    .string()
    .trim()
    .min(1, "Otp must be at least 1 digit")
    .max(6, "Otp must not exceed 6 digits")
    .length(6, "Otp must be of 6 digits");

export const messageidSchema = z
    .string()
    .trim()
    .refine(
        (value) => Types.ObjectId.isValid(value),
        "Please provide a valid message id"
    );

export const messageSchema = z
    .string()
    .trim()
    .min(6, "Message must be at least 6 characters")
    .max(100, "Message must not exceed 100 characters");

// Contact us schema
export const ContactUsSchema = z.object({
    name: z
        .string()
        .trim()
        .min(6, "Name must be at least 6 characters")
        .max(100, "Name must not exceed 100 characters"),
    email: emailSchema,
    message: messageSchema
});
export type ContactUsSchemaType = z.infer<typeof ContactUsSchema>;

// Accept messages schema
export const AcceptMessagesSchema = z.object({
    acceptMessages: z.boolean()
});
export type AcceptMessagesSchemaType = z.infer<typeof AcceptMessagesSchema>;

// Forgot password schema
export const ForgotPasswordSchema = z.object({
    email: emailSchema
});
export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
