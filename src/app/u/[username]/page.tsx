"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { SendMessageSchema, SendMessageSchemaType } from "@/schemas/frontend";
import { zodResolver } from "@hookform/resolvers/zod";
import ToolTipMessage from "@/components/common/ToolTipMessage";
import { cn } from "@/lib/utils";
import { useState } from "react";
import SubmitButton from "@/components/common/SubmitButton";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";
import { initialMessages } from "@/utils/constants";
import { RefreshCw } from "lucide-react";

const PublicMessagePage = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [suggestions, setSuggestions] = useState<string[]>(initialMessages);
    const [isLoadingSuggestions, setIsLoadingSuggestions] =
        useState<boolean>(false);

    const { username } = useParams<{ username: string }>();

    const form = useForm<SendMessageSchemaType>({
        resolver: zodResolver(SendMessageSchema),
        defaultValues: {
            content: ""
        },
        mode: "onChange"
    });
    const {
        control,
        setValue,
        watch,
        formState: { errors },
        handleSubmit,
        reset
    } = form;

    const content = watch("content");

    const onSubmit = async (data: SendMessageSchemaType) => {
        setIsSubmitting(true);
        const toastId = toast.loading("Loading...");

        try {
            const response = await axios.post<ApiResponse>(
                `/api/message/send`,
                { ...data, username }
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

    const fetchSuggestedMessages = async () => {
        setIsLoadingSuggestions(true);
        try {
            const response = await axios.post(`/api/messages/suggest`);
            if (response.status === 200) {
                setSuggestions(response.data.split("||"));
                toast.success("Suggesting messages");
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const handleAddSuggestMessage = (message: string) => {
        setValue("content", message);
    };

    return (
        <div className="bg-color-1 text-color-4 py-5 px-4">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 text-center text-color-3">
                    Public Profile Link
                </h2>

                <Form {...form}>
                    <form
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >
                        <FormField
                            control={control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel
                                        className={cn(
                                            "text-color-3",
                                            errors.content && "text-red-500"
                                        )}
                                    >
                                        Send Anonymous Message to @{username}
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your anonymous message here"
                                                className={cn(
                                                    "resize-none h-44 text-sm bg-white/5 border-color-2/20 text-white placeholder-color-4 focus:border-color-3 focus:ring-color-3",
                                                    errors.content &&
                                                        "border-red-500 focus:border-red-500  focus-visible:ring-red-500"
                                                )}
                                                {...field}
                                            />
                                        </FormControl>

                                        {errors.content && (
                                            <div className="absolute top-6 -translate-y-1/2 right-3">
                                                <ToolTipMessage
                                                    size={20}
                                                    message={
                                                        errors.content
                                                            ?.message as string
                                                    }
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormItem>
                            )}
                        />
                        <div className="w-40 mx-auto">
                            <Button
                                disabled={isSubmitting || !content}
                                className="bg-color-2 hover:bg-color-5 text-color-4 h-11 px-5 w-full"
                            >
                                {isSubmitting ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>Send a message</>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>

                <div className="space-y-8 my-8">
                    <div className="space-y-4">
                        <Button
                            disabled={isLoadingSuggestions}
                            onClick={fetchSuggestedMessages}
                            className="bg-color-2 hover:bg-color-5 text-color-4 h-11 px-5"
                        >
                            {isLoadingSuggestions ? (
                                <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Suggesting...
                                </>
                            ) : (
                                <>Suggest Messages</>
                            )}
                        </Button>
                        <p className="text-color-6">
                            Click on any message below to select it.
                        </p>
                    </div>
                    <Card className="bg-color-7 border-none shadow-lg rounded-lg px-2">
                        <CardHeader className="px-2 sm:px-6">
                            <h3 className="text-xl font-semibold text-color-3">
                                Messages
                            </h3>
                        </CardHeader>
                        <CardContent className="flex flex-col space-y-4 px-2 sm:px-6">
                            {suggestions.map((message, index) => (
                                <Button
                                    onClick={() =>
                                        handleAddSuggestMessage(message)
                                    }
                                    key={index}
                                    variant="outline"
                                    className="bg-color-1 text-color-4 border-color-2 hover:bg-color-5 hover:text-color-4 h-11 w-full text-wrap py-8"
                                >
                                    {message}
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                <div className="text-center my-3">
                    <div className="mb-3 text-color-6">
                        Get Your Message Board
                    </div>
                    <Link href="/signup">
                        <Button className="bg-color-2 hover:bg-color-5 text-color-4 h-11 px-5">
                            Create Your Account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PublicMessagePage;
