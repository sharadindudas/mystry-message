import { connectMongoDB } from "@/lib/mongodb";
import { Message } from "@/models/message";
import { UserModel } from "@/models/user";
import { SendMessageSchema, SendMessageSchemaType } from "@/schemas/backend";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { NextResponse } from "next/server";

export const POST = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = (await req.json()) as SendMessageSchemaType;

    // Validation of data
    const { username, content } = SendMessageSchema.parse(requestBodyData);

    // Check if the user with username exists in the db or not
    const userExists = await UserModel.findOne({ username, isVerified: true });
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the user is accepting messages or not
    if (!userExists.isAcceptingMessages) {
        throw new ErrorHandler("User is not accepting messages", 409);
    }

    // Send the message to the user
    const newMessage = {
        content
    } as Message;
    userExists.messages.push(newMessage);
    await userExists.save({ validateBeforeSave: false });

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Message sent successfully"
        },
        { status: 200 }
    );
});
