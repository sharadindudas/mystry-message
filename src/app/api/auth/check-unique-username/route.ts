import { TryCatchHandler, ErrorHandler } from "@/utils/handlers";
import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { NextResponse } from "next/server";
import {
    UniqueUsernameSchema,
    UniqueUsernameSchemaType
} from "@/schemas/backend";

export const GET = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request query
    const { searchParams } = new URL(req.nextUrl);
    const requestQueryData = {
        username: searchParams.get("username")
    } as UniqueUsernameSchemaType;

    // Validation of data
    const { username } = UniqueUsernameSchema.parse(requestQueryData);

    // Check if the username is already taken or not
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username
    });
    if (existingUserVerifiedByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "Username is unique"
        },
        { status: 200 }
    );
});
