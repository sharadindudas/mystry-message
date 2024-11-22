import { connectMongoDB } from "@/lib/mongodb";
import { TryCatchHandler, ErrorHandler } from "@/utils/handlers";
import { getServerSession, User } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserModel } from "@/models/user";
import {
    AcceptMessagesSchema,
    AcceptMessagesSchemaType
} from "@/schemas/common";

// Get accept messages status
export const GET = TryCatchHandler(async () => {
    // Connection to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !user) {
        throw new ErrorHandler("User is not logged in", 401);
    }

    // Get the user data
    const userExists = await UserModel.findById(user.id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Accept messages status fetched successfully",
            isAcceptingMessages: userExists.isAcceptingMessages
        },
        { status: 200 }
    );
});

// Update accept messages status
export const POST = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !user) {
        throw new ErrorHandler("User is not logged in", 401);
    }

    // Get data from request body
    const requestBodyData = (await req.json()) as AcceptMessagesSchemaType;

    // Validation of data
    const { acceptMessages } = AcceptMessagesSchema.parse(requestBodyData);

    // Get the user data
    const userExists = await UserModel.findById(user.id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Update the accept messages status
    userExists.isAcceptingMessages = acceptMessages;
    await userExists.save({ validateBeforeSave: false });

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: `You ${acceptMessages ? "can accept" : "cannot accept"} messages`
        },
        { status: 200 }
    );
});
