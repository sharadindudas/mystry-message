import { connectMongoDB } from "@/lib/mongodb";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { UserModel } from "@/models/user";

export const GET = TryCatchHandler(async () => {
    // Connection to mongodb
    await connectMongoDB();

    // Check if the user is logged in or not
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if (!session || !user) {
        throw new ErrorHandler("User is not logged in", 401);
    }

    // Convert the user id to mongodb object id
    const userid = new Types.ObjectId(user.id);

    // Get the user details
    const userExists = await UserModel.findById(userid);
    if (!userExists) {
        throw new ErrorHandler("User does not exists", 404);
    }

    // Check if the messages is empty or not
    if (!userExists.messages || userExists.messages.length === 0) {
        return NextResponse.json(
            {
                success: true,
                message: "No messages are found",
                messages: []
            },
            { status: 200 }
        );
    }

    // Get all the messages of the user
    const allMessages = await UserModel.aggregate([
        // Find the user using the user id
        { $match: { _id: userid } },

        // Seperate the messages into single object
        { $unwind: "$messages" },

        // Sort the messages by latest time
        { $sort: { "messages.createdAt": -1 } },

        // Group all the messages into one single array
        { $group: { _id: "$_id", messages: { $push: "$messages" } } }
    ]);

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Messages fetched successfully",
            messages: allMessages[0].messages
        },
        { status: 200 }
    );
});
