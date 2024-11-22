import { Message } from "@/models/message";
import { NextRequest, NextResponse } from "next/server";

export interface ApiResponse {
    success: boolean;
    message: string;
    isAcceptingMessages?: boolean;
    messages?: Message[];
}

export interface SignupResponse extends ApiResponse {
    data: {
        _id: string;
        username: string;
        email: string;
        isVerified: false;
        isAcceptingMessages: true;
    };
}

export type HandlerFunction = (
    req: NextRequest,
    params?: any
) => Promise<NextResponse<ApiResponse>>;
