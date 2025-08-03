"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import SubmitButton from "@/components/common/SubmitButton";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { VerifyOtpSchema, VerifyOtpSchemaType } from "@/schemas/frontend";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";
import { useRouter } from "next/navigation";

const VerifyOtpPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const userid = localStorage.getItem("userid") as string;
        if (!userid) {
            router.replace("/");
            return;
        }
    }, [router]);

    const form = useForm<VerifyOtpSchemaType>({
        resolver: zodResolver(VerifyOtpSchema),
        defaultValues: {
            otp: ""
        },
        mode: "onChange"
    });

    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const onSubmit = async (data: VerifyOtpSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.put<ApiResponse>(
                `/api/auth/verify-otp`,
                null,
                {
                    params: {
                        userid: localStorage.getItem("userid"),
                        otp: data.otp
                    }
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.removeItem("userid");
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

    const handleResendOtp = async () => {
        try {
            const response = await axios.get<ApiResponse>(
                `/api/auth/send-otp`,
                {
                    params: { userid: localStorage.getItem("userid") }
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    };

    return (
        <div className="w-full max-w-md">
            {/* Form top */}
            <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-bold mt-6 mb-2">
                    Verify Your Email
                </h2>
                <p className="text-color-4 text-sm sm:text-base">
                    Enter the 6-digit code sent to your email
                </p>
            </div>

            {/* Verify otp form */}
            <Form {...form}>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={control}
                        name="otp"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>One-Time Password (OTP)</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        pattern={REGEXP_ONLY_DIGITS}
                                        maxLength={6}
                                        {...field}
                                        className="mt-2"
                                    >
                                        <InputOTPGroup className="gap-3 justify-center w-full">
                                            {[0, 1, 2, 3, 4, 5].map(
                                                (_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className={cn(
                                                            "bg-white/5 text-base rounded-lg! border border-color-2/20 text-white w-16 h-16",
                                                            errors.otp &&
                                                                "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                )
                                            )}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <SubmitButton
                        isValid={isValid}
                        isSubmitting={isSubmitting}
                        text="Verify OTP"
                    />
                </form>
            </Form>

            {/* Form bottom */}
            <div className="mt-6 text-center text-color-4 text-sm">
                <p className="mb-3">
                    Didn&apos;t receive the code?{" "}
                    <Button
                        onClick={handleResendOtp}
                        variant="link"
                        className="text-color-3 p-0 h-auto font-normal hover:underline"
                    >
                        Resend OTP
                    </Button>
                </p>
                <Link
                    href="/signup"
                    className="inline-flex items-center text-color-3 hover:underline"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Sign Up
                </Link>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
