"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/common/SubmitButton";
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
import { ContactUsSchema, ContactUsSchemaType } from "@/schemas/common";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import { cn } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const form = useForm<ContactUsSchemaType>({
        resolver: zodResolver(ContactUsSchema),
        defaultValues: {
            name: "",
            email: "",
            message: ""
        },
        mode: "onChange"
    });
    const {
        control,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = form;

    const onSubmit = async (data: ContactUsSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.post<ApiResponse>(
                `/api/contact`,
                data
            );
            if (response.data.success) {
                toast.success(response.data.message);
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
        <div className="pt-8 pb-14 bg-color-1 text-color-4">
            <main className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-color-2 to-color-3 text-transparent bg-clip-text">
                    Contact us
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-color-3">
                            Get in Touch
                        </h2>
                        <p className="mb-6">
                            Have questions, suggestions, or just want to say
                            hello? We&apos;d love to hear from you! Fill out the
                            form, and we&apos;ll get back to you as soon as
                            possible.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Mail className="h-6 w-6 text-color-2 mr-3" />
                                <span>support@mystrymessage.com</span>
                            </div>
                            <div className="flex items-center">
                                <Phone className="h-6 w-6 text-color-2 mr-3" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center">
                                <MapPin className="h-6 w-6 text-color-2 mr-3" />
                                <span>
                                    123 Mystery Lane, Secret City, AN 12345
                                </span>
                            </div>
                        </div>
                    </section>

                    <section>
                        <Form {...form}>
                            <form
                                noValidate
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter your name"
                                                        autoComplete="on"
                                                        {...field}
                                                        className={cn(
                                                            "bg-white/5 border-color-2/20 text-white h-12",
                                                            errors.name &&
                                                                "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                    />
                                                </FormControl>

                                                {errors.name && (
                                                    <div className="absolute top-1/2 -translate-y-1/2 right-4">
                                                        <ToolTipMessage
                                                            size={20}
                                                            message={
                                                                errors.name
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
                                <FormField
                                    control={control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Textarea
                                                        rows={5}
                                                        placeholder="Enter your message"
                                                        className={cn(
                                                            "bg-white/5 border-color-2/20 text-white text-sm py-3 resize-none",
                                                            errors.message &&
                                                                "border-red-500 focus-visible:ring-red-500"
                                                        )}
                                                        {...field}
                                                    />
                                                </FormControl>

                                                {errors.message && (
                                                    <div className="absolute top-6 -translate-y-1/2 right-4">
                                                        <ToolTipMessage
                                                            size={20}
                                                            message={
                                                                errors.message
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
                                    isSubmitting={isSubmitting}
                                    isValid={isValid}
                                    text="Send Message"
                                />
                            </form>
                        </Form>
                    </section>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;
