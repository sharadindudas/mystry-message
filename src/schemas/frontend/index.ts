import { z } from "zod";
import {
    emailSchema,
    messageSchema,
    otpSchema,
    passwordSchema,
    usernameSchema
} from "@/schemas/common";

// Login schema
export const LoginSchema = z.object({
    identity: z
        .string()
        .trim()
        .refine((value) => {
            const isEmail = emailSchema.safeParse(value.toLowerCase());
            const isUsername = usernameSchema.safeParse(value.toLowerCase());
            return isEmail.success || isUsername.success;
        }, "Please provide a valid email address or username"),
    password: passwordSchema
});
export type LoginSchemaType = z.infer<typeof LoginSchema>;

// Signup schema
export const SignupSchema = z
    .object({
        username: usernameSchema,
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z
            .string()
            .trim()
            .min(8, "Confirm password must be atleast 8 characters")
            .max(100, "Confirm password must not exceed 100 characters")
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password and confirm password does not match",
        path: ["confirmPassword"]
    });
export type SignupSchemaType = z.infer<typeof SignupSchema>;

// Verify otp schema
export const VerifyOtpSchema = z.object({
    otp: otpSchema
});
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;

// Send message schema
export const SendMessageSchema = z.object({
    content: messageSchema
});
export type SendMessageSchemaType = z.infer<typeof SendMessageSchema>;

// Forgot password token schema
export const ForgotPasswordTokenSchema = z
    .object({
        newPassword: passwordSchema,
        confirmNewPassword: z
            .string()
            .trim()
            .min(8, "Confirm new password must be atleast 8 characters")
            .max(100, "Confirm new password must not exceed 100 characters")
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "New password and confirm new password does not match",
        path: ["confirmNewPassword"]
    });
export type ForgotPasswordTokenSchemaType = z.infer<
    typeof ForgotPasswordTokenSchema
>;
