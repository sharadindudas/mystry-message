"use client";

import { useSession } from "next-auth/react";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";
import { RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { Message } from "@/models/message";
import { ApiResponse } from "@/types/types";
import MessageCard from "@/components/dashboard/MessageCard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AcceptMessagesSchema,
    AcceptMessagesSchemaType
} from "@/schemas/common";
import { User } from "next-auth";

const DashboardPage = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { data: session, status } = useSession();
    const user = session?.user as User;

    const form = useForm<AcceptMessagesSchemaType>({
        resolver: zodResolver(AcceptMessagesSchema)
    });
    const { register, watch, setValue } = form;

    const isAcceptingMessages = watch("acceptMessages");

    const fetchAllMessages = useCallback(async (refresh: boolean = false) => {
        setIsSubmitting(true);
        try {
            const response = await axios.get<ApiResponse>(`/api/messages/get`);
            if (response.data.success) {
                setMessages(response.data.messages as Message[]);
                if (refresh) {
                    toast.success("Showing latest messages");
                }
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    const fetchAcceptMessageStatus = useCallback(async () => {
        try {
            const response =
                await axios.get<ApiResponse>(`/api/messages/accept`);
            if (response.data.success) {
                setValue("acceptMessages", response.data.isAcceptingMessages!);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    }, [setValue]);

    useEffect(() => {
        fetchAllMessages();
        fetchAcceptMessageStatus();
    }, [fetchAllMessages, fetchAcceptMessageStatus]);

    const handleUpdateAcceptMessagesStatus = async () => {
        try {
            const response = await axios.post<ApiResponse>(
                `/api/messages/accept`,
                { acceptMessages: !isAcceptingMessages }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                setValue("acceptMessages", !isAcceptingMessages);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleDeleteMessage = (messageid: string) => {
        setMessages(messages.filter((message) => message._id !== messageid));
    };

    if (status === "loading") {
        return <DashboardLoader />;
    }

    const profileUrl = `${window.location.origin}/u/${user?.username}`;

    const handleCopyLink = () => {
        window.navigator.clipboard.writeText(profileUrl);
        toast.success("Link has been copied");
    };

    return (
        <div className="pt-8 pb-14 px-4 bg-color-1 text-color-4">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-bold mb-8 lg:mb-12">
                    Your
                    <span className="text-color-3 relative ml-2">
                        Dashboard
                        <svg
                            className="absolute -bottom-2 left-0 w-full"
                            viewBox="0 0 200 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1 5.5C47.3333 2.16667 146.6 -2.4 199 5"
                                stroke="#0d9488"
                                strokeWidth="2"
                            />
                        </svg>
                    </span>
                </h2>

                {/* Dashboard profile link */}
                <Card className="bg-color-7 border-none shadow-lg mb-8">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="text-color-3">
                            Your Unique Link
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                        <div className="flex items-center justify-center gap-2">
                            <Input
                                type="text"
                                value={profileUrl}
                                readOnly
                                className="grow bg-color-1 border-none font-medium text-color-4 h-11"
                            />
                            <Button
                                onClick={handleCopyLink}
                                className="bg-color-2 hover:bg-color-5 text-color-4 h-11 sm:px-5"
                            >
                                <Copy className="w-4 h-4 sm:mr-2" />
                                <span className="hidden sm:inline">Copy</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Dashboard message settings */}
                <Card className="bg-color-7 border-none shadow-lg mb-10">
                    <CardHeader className="px-4 sm:px-6">
                        <CardTitle className="text-color-3">
                            Message Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                        <div className="flex items-center space-x-4">
                            <Switch
                                {...register("acceptMessages")}
                                checked={isAcceptingMessages}
                                onCheckedChange={
                                    handleUpdateAcceptMessagesStatus
                                }
                                className="data-[state=checked]:bg-color-2 data-[state=unchecked]:bg-color-1"
                            />
                            <span className="text-color-4 text-sm sm:text-base">
                                Accept Messages:{" "}
                                {isAcceptingMessages ? "On" : "Off"}
                            </span>
                        </div>
                    </CardContent>
                </Card>

                {/* Dashboard messages */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-semibold">
                        Your
                        <span className="text-color-3 ml-2">Messages</span>
                    </h2>
                    <Button
                        onClick={() => fetchAllMessages(true)}
                        variant="outline"
                        className="border-color-2 text-color-2 hover:bg-color-2 hover:text-color-4 h-11 px-5"
                    >
                        {isSubmitting ? (
                            <RefreshCcw className="h-4 w-4 sm:mr-2 animate-spin" />
                        ) : (
                            <RefreshCcw className="h-4 w-4 sm:mr-2" />
                        )}
                        <span className="hidden sm:inline">Refresh</span>
                    </Button>
                </div>

                {messages.length === 0 ? (
                    <Card className="bg-color-7 border-none shadow-lg w-full">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <Inbox className="h-16 w-16 text-color-2 mb-2" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-color-4 mb-2">
                                No messages yet
                            </h3>
                            <p className="text-color-6 sm:max-w-sm">
                                When you receive messages, they&apos;ll appear
                                here. Share your profile link to start getting
                                messages!
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {messages.map((message) => (
                            <MessageCard
                                key={message._id as string}
                                message={message}
                                onMessageDeleted={handleDeleteMessage}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
