"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    ForgotPasswordTokenSchema,
    ForgotPasswordTokenSchemaType
} from "@/schemas/frontend";
import SubmitButton from "@/components/common/SubmitButton";
import { cn } from "@/lib/utils";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import { ApiResponse } from "@/types/types";

const ForgotPasswordTokenPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { token } = useParams<{ token: string }>();
    const router = useRouter();

    const form = useForm<ForgotPasswordTokenSchemaType>({
        resolver: zodResolver(ForgotPasswordTokenSchema),
        defaultValues: {
            newPassword: "",
            confirmNewPassword: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const onSubmit = async (data: ForgotPasswordTokenSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.put<ApiResponse>(
                `/api/auth/forgot-password`,
                {
                    ...data,
                    token
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                router.replace("/login");
                reset();
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
        <div className="max-w-md w-full space-y-8">
            <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-color-4">
                    Reset Your Password
                </h2>
                <p className="mt-2 text-center text-sm text-color-4">
                    Please enter your new password below.
                </p>
            </div>
            <Form {...form}>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your new password"
                                            autoComplete="on"
                                            {...field}
                                            className={cn(
                                                "bg-white/5 border-color-2/20 text-white h-12",
                                                errors.newPassword &&
                                                    "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>

                                    {errors.newPassword && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-11">
                                            <ToolTipMessage
                                                size={20}
                                                message={
                                                    errors.newPassword
                                                        ?.message as string
                                                }
                                            />
                                        </div>
                                    )}

                                    <div
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeIcon size={18} />
                                        ) : (
                                            <EyeOffIcon size={18} />
                                        )}
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="confirmNewPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Confirm your new password"
                                            autoComplete="on"
                                            {...field}
                                            className={cn(
                                                "bg-white/5 border-color-2/20 text-white h-12",
                                                errors.confirmNewPassword &&
                                                    "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>

                                    {errors.confirmNewPassword && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-11">
                                            <ToolTipMessage
                                                size={20}
                                                message={
                                                    errors.confirmNewPassword
                                                        ?.message as string
                                                }
                                            />
                                        </div>
                                    )}

                                    <div
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeIcon size={18} />
                                        ) : (
                                            <EyeOffIcon size={18} />
                                        )}
                                    </div>
                                </div>
                            </FormItem>
                        )}
                    />
                    <SubmitButton
                        isValid={isValid}
                        isSubmitting={isSubmitting}
                        text="Reset Password"
                    />
                </form>
            </Form>
        </div>
    );
};

export default ForgotPasswordTokenPage;
