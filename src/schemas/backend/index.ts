import { z } from "zod";
import {
    emailSchema,
    messageidSchema,
    messageSchema,
    otpSchema,
    passwordSchema,
    useridSchema,
    usernameSchema
} from "@/schemas/common";

// Signup schema
export const SignupSchema = z.object({
    username: usernameSchema,
    email: emailSchema,
    password: passwordSchema
});
export type SignupSchemaType = z.infer<typeof SignupSchema>;

// Send otp schema
export const SendOtpSchema = z.object({
    userid: useridSchema
});
export type SendOtpSchemaType = z.infer<typeof SendOtpSchema>;

// Verify otp schema
export const VerifyOtpSchema = z.object({
    userid: useridSchema,
    otp: otpSchema
});
export type VerifyOtpSchemaType = z.infer<typeof VerifyOtpSchema>;

// Unique username schema
export const UniqueUsernameSchema = z.object({
    username: usernameSchema
});
export type UniqueUsernameSchemaType = z.infer<typeof UniqueUsernameSchema>;

// Send message schema
export const SendMessageSchema = z.object({
    username: usernameSchema,
    content: messageSchema
});
export type SendMessageSchemaType = z.infer<typeof SendMessageSchema>;

// Delete message schema
export const DeleteMessageSchema = z.object({
    messageid: messageidSchema
});
export type DeleteMessageSchemaType = z.infer<typeof DeleteMessageSchema>;

// Forgot password token schema
export const ForgotPasswordTokenSchema = z
    .object({
        token: z.string().trim(),
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
