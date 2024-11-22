import { connectMongoDB } from "@/lib/mongodb";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import {
    DeleteMessageSchema,
    DeleteMessageSchemaType
} from "@/schemas/backend";
import { UserModel } from "@/models/user";

export const DELETE = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !user) {
        throw new ErrorHandler("User is not logged in", 401);
    }

    // Get data from request query
    const { searchParams } = new URL(req.nextUrl);
    const requestQueryData = {
        messageid: searchParams.get("messageid")
    } as DeleteMessageSchemaType;

    // Validation of data
    const { messageid } = DeleteMessageSchema.parse(requestQueryData);

    // Get the user data
    const userExists = await UserModel.findById(user.id);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Delete the message
    const deletedMessageResult = await UserModel.updateOne(
        { _id: user.id },
        { $pull: { messages: { _id: messageid } } }
    );
    if (deletedMessageResult.modifiedCount === 0) {
        throw new ErrorHandler("Message not found or already deleted", 404);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Message deleted successfully"
        },
        { status: 200 }
    );
});
