"use client";

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
import { LoginSchema, LoginSchemaType } from "@/schemas/frontend";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const router = useRouter();

    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            identity: "",
            password: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const onSubmit = async (data: LoginSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            // Check if the user logged in successfully or not
            const response = await signIn("credentials", {
                ...data,
                redirect: false
            });
            if (response?.error) {
                toast.error(response.error);
                return;
            }

            // Move to dashboard page
            toast.success("Logged in successfully");
            router.replace("/dashboard");
            reset();
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
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
                    Login to your account
                </h2>
                <p className="text-color-4 text-sm sm:text-base">
                    Kickstart with anonymous messaging quickly
                </p>
            </div>

            {/* Login form */}
            <Form {...form}>
                <form
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <FormField
                        control={control}
                        name="identity"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email / Username</FormLabel>
                                <div className="relative mt-2">
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter your email or username"
                                            autoComplete="on"
                                            {...field}
                                            className={cn(
                                                "bg-white/5 border-color-2/20 text-white h-12",
                                                errors.identity &&
                                                    "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>

                                    {errors.identity && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                            <ToolTipMessage
                                                size={20}
                                                message={
                                                    errors.identity
                                                        ?.message as string
                                                }
                                            />
                                        </div>
                                    )}
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <div className="flex items-center justify-between">
                                    <FormLabel>Password</FormLabel>
                                    <Link
                                        href="/forgot-password"
                                        className="font-medium text-sm underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                                <div className="relative mt-2">
                                    <FormControl>
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Enter your password"
                                            autoComplete="on"
                                            {...field}
                                            className={cn(
                                                "bg-white/5 border-color-2/20 text-white h-12",
                                                errors.password &&
                                                    "border-red-500 focus-visible:ring-red-500"
                                            )}
                                        />
                                    </FormControl>

                                    {errors.password && (
                                        <div className="absolute top-1/2 -translate-y-1/2 right-11">
                                            <ToolTipMessage
                                                size={20}
                                                message={
                                                    errors.password
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

                    <SubmitButton
                        isValid={isValid}
                        isSubmitting={isSubmitting}
                        text="Log In"
                    />
                </form>
            </Form>

            {/* Form bottom */}
            <p className="mt-6 text-center text-color-4 text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-color-3 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default LoginPage;
