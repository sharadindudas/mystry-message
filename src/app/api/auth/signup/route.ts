import { connectMongoDB } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { SignupSchema, SignupSchemaType } from "@/schemas/backend";
import { ErrorHandler, TryCatchHandler } from "@/utils/handlers";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

export const POST = TryCatchHandler(async (req) => {
    // Connection to mongodb
    await connectMongoDB();

    // Get data from request body
    const requestBodyData = (await req.json()) as SignupSchemaType;

    // Validation of data
    const { username, email, password } = SignupSchema.parse(requestBodyData);

    // Check if the username is already taken or not
    const existingUserByUsername = await UserModel.findOne({
        username
    });
    if (existingUserByUsername) {
        throw new ErrorHandler("Username is already taken", 409);
    }

    // Check if the email already exists in the db or not
    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
        throw new ErrorHandler("User already exists, Please login", 409);
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user
    const newUser = await UserModel.create({
        username,
        email,
        password: hashedPassword
    });

    // Remove sensitive data
    newUser.password = undefined!;
    newUser.__v = undefined!;

    // Return the response
    return NextResponse.json(
        {
            success: true,
            message: "User is registered successfully",
            data: newUser
        },
        { status: 201 }
    );
});
