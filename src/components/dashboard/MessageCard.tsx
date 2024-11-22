import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Message } from "@/models/message";
import dayjs from "dayjs";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";
import toast from "react-hot-toast";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface MessageCardProps {
    message: Message;
    onMessageDeleted: (messageid: string) => void;
}

const MessageCard = ({ message, onMessageDeleted }: MessageCardProps) => {
    const handleDeleteMessage = async () => {
        try {
            const response = await axios.delete<ApiResponse>(
                `/api/message/delete`,
                {
                    params: { messageid: message._id }
                }
            );
            if (response.data.success) {
                toast.success(response.data.message);
                onMessageDeleted(message._id as string);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data.message);
            }
        }
    };

    return (
        <Card className="bg-color-7 border-none cursor-pointer transition-all shadow-md hover:bg-color-7/90">
            <CardContent className="p-6">
                <p className="text-color-4 mb-4">{message.content}</p>
                <div className="flex justify-between items-center">
                    <div className="text-sm text-color-6">
                        Received:{" "}
                        {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-color-2 hover:text-color-3 hover:bg-color-1"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-color-7 border-color-3">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-color-3">
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-color-4">
                                    This action cannot be undone. This will
                                    permanently delete this message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="border-none bg-color-1 text-color-4 hover:bg-color-6 h-10 px-5">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDeleteMessage}
                                    className="border-none bg-color-2 text-color-4 hover:bg-color-5 h-10 px-5"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default MessageCard;
