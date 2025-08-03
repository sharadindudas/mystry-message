"use client";

import { useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import SubmitButton from "@/components/common/SubmitButton";
import toast from "react-hot-toast";
import {
    ForgotPasswordSchema,
    ForgotPasswordSchemaType
} from "@/schemas/common";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";

const ForgotPasswordPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const form = useForm<ForgotPasswordSchemaType>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        watch
    } = form;

    const email = watch("email");

    const onSubmit = async (data: ForgotPasswordSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.post<ApiResponse>(
                `/api/auth/forgot-password`,
                data
            );
            if (response.data.success) {
                toast.success(response.data.message);
                setIsSubmitted(true);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        } finally {
            setIsSubmitting(false);
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Form top */}
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mt-6 mb-2">
                    Forgot your password?
                </h2>
                <p className="text-color-4 text-sm sm:text-base">
                    No worries, we&apos;ll send you reset instructions.
                </p>
            </div>

            {/* Forgot password form */}
            {!isSubmitted ? (
                <Form {...form}>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                autoComplete="on"
                                                {...field}
                                                className={cn(
                                                    "bg-white/5 border-color-2/20 text-white h-12",
                                                    errors.email &&
                                                        "border-red-500 focus-visible:ring-red-500"
                                                )}
                                            />
                                        </FormControl>

                                        {errors.email && (
                                            <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.email
                                                            ?.message as string
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <SubmitButton
                            isValid={isValid}
                            isSubmitting={isSubmitting}
                            text="Submit"
                        />
                    </form>
                </Form>
            ) : (
                <div className="rounded-md bg-color-7 p-4">
                    <div className="flex">
                        <div className="shrink-0">
                            <CheckCircle
                                className="h-5 w-5 text-color-2"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="ml-3">
                            <h3 className="text-sm font-medium text-color-4">
                                Reset link sent!
                            </h3>
                            <p className="mt-2 text-sm text-color-4">
                                We&apos;ve sent a password reset link to{" "}
                                <b className="text-color-3">{email}</b>. Please
                                check your inbox and follow the instructions to
                                reset your password.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Form bottom */}
            <div className="text-center mt-5 text-sm">
                <Link
                    href="/login"
                    className="inline-flex items-center text-color-3 hover:underline"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
